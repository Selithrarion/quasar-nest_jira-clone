import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TeamEntity } from './entity/team.entity';
import { CreateTeamDTO } from './dto';
import { UserService } from '../user/user.service';

import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { PublicFileEntity } from '../files/entity/public-file.entity';
import { FilesService } from '../files/files.service';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(TeamEntity)
    private readonly teams: Repository<TeamEntity>,

    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(FilesService)
    private readonly filesService: FilesService
  ) {}

  async getByID(id: number): Promise<TeamEntity> {
    return await this.teams.findOne(id);
  }

  async create({ name, users }: CreateTeamDTO, userID: number): Promise<TeamEntity> {
    const leader = await this.userService.getByID(userID);

    const isTeamAlreadyExist = await this.teams.findOne({ where: { name } });
    if (isTeamAlreadyExist) throw new HttpException('TEAM_ALREADY_EXIST', HttpStatus.BAD_REQUEST);

    const team = await this.teams.create({ name, users: [...users, leader], leader });
    const createdTeam = await this.teams.save(team);

    return createdTeam;
  }

  async addUsers(id: number, users: UserEntity[]): Promise<TeamEntity> {
    const team = await this.teams.findOneOrFail(id);
    const newTeamUsers = [...team.users, ...users];
    return await this.teams.save({ ...team, users: newTeamUsers });
  }

  async update(id: number, payload: Partial<TeamEntity>): Promise<TeamEntity> {
    const toUpdate = await this.teams.findOneOrFail(id);
    const updated = this.teams.create({ ...toUpdate, ...payload });
    await this.teams.save(updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.teams.delete(id);
  }

  async setTeamImage(file: Express.Multer.File, field: 'avatar' | 'header', id: number): Promise<PublicFileEntity> {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validImageSize = 1024 * 1024 * 20;
    const isInvalidType = !validImageTypes.includes(file.mimetype);

    if (isInvalidType) throw new HttpException('INVALID_FILE_TYPE', HttpStatus.UNPROCESSABLE_ENTITY);
    if (validImageSize < file.size) throw new HttpException('INVALID_FILE_SIZE', HttpStatus.UNPROCESSABLE_ENTITY);

    const quality = field === 'avatar' ? 5 : 20;
    const fileBuffer = await sharp(file.buffer).webp({ quality }).toBuffer();
    const filename = uuidv4() + extname(file.originalname);

    const team = await this.teams.findOneOrFail(id);
    const isAlreadyHaveFieldImage = Boolean(team[field]);

    if (isAlreadyHaveFieldImage) {
      await this.teams.update(id, {
        [field]: null,
      });
      await this.filesService.deletePublicFile(team[field].id);
    }

    const uploadedFile = await this.filesService.uploadPublicFile(fileBuffer, filename);
    await this.teams.update(id, {
      [field]: uploadedFile,
    });

    return uploadedFile;
  }

  async deleteTeamImage(field: 'avatar' | 'header', id: number): Promise<void> {
    const team = await this.teams.findOneOrFail(id);
    const fileID = team[field]?.id;
    if (fileID) {
      await this.teams.update(id, {
        [field]: null,
      });
      await this.filesService.deletePublicFile(fileID);
    }
  }

  async isTeamNameTaken(name: string): Promise<boolean> {
    const team = await this.teams.findOne({ where: { name } });
    return Boolean(team);
  }
}
