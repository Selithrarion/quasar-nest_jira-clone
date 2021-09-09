import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto';
import { UserEntity } from './entity/user.entity';
import { ProjectEntity } from '../projects/entity/project.entity';
import { BoardEntity } from '../boards/entity/board.entity';

import stringToHslColor from '../../common/utils/stringToHslColor';

import * as sharp from 'sharp';
import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { FilesService } from '../files/files.service';
import { PublicFileEntity } from '../files/entity/public-file.entity';
import { UserSearchService } from './user-search.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>,

    @Inject(UserSearchService)
    private readonly userSearchService: UserSearchService,

    @Inject(FilesService)
    private readonly filesService: FilesService
  ) {}

  async get(searchText: string, userID: number): Promise<UserEntity[]> {
    const searchResult = await this.userSearchService.search(searchText);
    const userIDs = searchResult.map((result) => result.id);
    if (!userIDs.length) return [];
    return this.users.find({
      where: { id: In(userIDs) },
      take: 11,
    });
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.users.findOne({ where: { email } });
  }
  async getByID(id: number): Promise<UserEntity> {
    return await this.users.findOne(id);
  }
  async getProfileByID(id: number): Promise<UserEntity> {
    return await this.users.findOne(id, {
      relations: ['assignedIssues', 'watchingIssues', 'favoriteProjects', 'teams', 'teamsLeader'],
    });
  }

  async create(payload: CreateUserDTO): Promise<UserEntity> {
    const isUserAlreadyExist = await this.users.findOne({ where: { email: payload.email } });
    if (isUserAlreadyExist) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.BAD_REQUEST);

    const user = await this.users.create({ ...payload, color: stringToHslColor(payload.username) });
    const createdUser = await this.users.save(user);

    return createdUser;
  }

  async update(id: number, payload: Partial<UserEntity>): Promise<UserEntity> {
    const toUpdate = await this.users.findOneOrFail(id);
    const user = this.users.create({ ...toUpdate, ...payload });
    const updated = await this.users.save(user);
    if (updated) {
      await this.userSearchService.update(user);
      return updated;
    }
  }

  async delete(id: number): Promise<void> {
    await this.users.delete(id);
    await this.userSearchService.remove(id);
  }

  // TODO: refactor (code duplication in team.service)
  async setUserImage(file: Express.Multer.File, field: 'avatar' | 'header', id: number): Promise<PublicFileEntity> {
    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    const validImageSize = 1024 * 1024 * 20;
    const isInvalidType = !validImageTypes.includes(file.mimetype);

    if (isInvalidType) throw new HttpException('INVALID_FILE_TYPE', HttpStatus.UNPROCESSABLE_ENTITY);
    if (validImageSize < file.size) throw new HttpException('INVALID_FILE_SIZE', HttpStatus.UNPROCESSABLE_ENTITY);

    const quality = field === 'avatar' ? 5 : 20;
    const fileBuffer = await sharp(file.buffer).webp({ quality }).toBuffer();
    const filename = uuidv4() + extname(file.originalname);

    const user = await this.users.findOneOrFail(id);
    const isAlreadyHaveFieldImage = Boolean(user[field]);

    if (isAlreadyHaveFieldImage) {
      const updatedUser = await this.users.save({
        ...user,
        [field]: null,
      });
      await this.filesService.deletePublicFile(user[field].id);
      await this.userSearchService.update(updatedUser);
    }

    const uploadedFile = await this.filesService.uploadPublicFile(fileBuffer, filename);
    const updatedUser = await this.users.save({
      ...user,
      [field]: uploadedFile,
    });
    await this.userSearchService.update(updatedUser);

    return uploadedFile;
  }

  async deleteUserImage(field: 'avatar' | 'header', id: number): Promise<void> {
    const user = await this.users.findOneOrFail(id);
    const fileID = user[field]?.id;
    if (fileID) {
      const updatedUser = await this.users.save({
        ...user,
        [field]: null,
      });
      await this.filesService.deletePublicFile(fileID);
      await this.userSearchService.update(updatedUser);
    }
  }

  async setRefreshToken(id: number, refreshToken: string): Promise<void> {
    const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
    await this.users.update(id, {
      hashedRefreshToken,
    });
  }

  async getFavoriteProjects(id: number): Promise<ProjectEntity[]> {
    const user = await this.users.findOneOrFail(id, { relations: ['favoriteProjects'] });
    return user.favoriteProjects;
  }
  async getFavoriteBoards(id: number): Promise<BoardEntity[]> {
    const user = await this.users.findOneOrFail(id, { relations: ['favoriteBoards'] });
    return user.favoriteBoards;
  }

  async isUsernameTaken(username: string): Promise<boolean> {
    const user = await this.users.findOne({ where: { username } });
    return Boolean(user);
  }
}
