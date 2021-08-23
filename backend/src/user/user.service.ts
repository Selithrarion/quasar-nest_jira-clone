import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { CreateUserDTO } from './dto';
import { UserEntity } from './entity/user.entity';
import { ProjectEntity } from '../projects/entity/project.entity';
import { BoardEntity } from '../boards/entity/board.entity';
import stringToHslColor from '../utils/stringToHslColor';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.users.findOne({ where: { email } });
  }
  async getByID(id: number): Promise<UserEntity> {
    return await this.users.findOne(id);
  }

  async create(payload: CreateUserDTO): Promise<UserEntity> {
    const isUserAlreadyExist = await this.users.findOne({ where: { email: payload.email } });
    // temporarily delete existing user to test
    // if (isUserAlreadyExist) await this.users.delete(isUserAlreadyExist.id);
    if (isUserAlreadyExist) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.BAD_REQUEST);

    const user = await this.users.create({ ...payload, color: stringToHslColor(payload.username) });
    const createdUser = await this.users.save(user);

    return createdUser;
  }

  async update(id: number, payload: Partial<UserEntity>): Promise<UserEntity> {
    const toUpdate = await this.users.findOneOrFail(id);
    const updated = this.users.create({ ...toUpdate, ...payload });
    await this.users.save(updated);
    return updated;
  }

  async setAvatar(fileURL: string, id: number): Promise<string> {
    await this.users.update(id, { avatarURL: fileURL });
    return fileURL;
  }
  async setProfileHeader(fileURL: string, id: number): Promise<string> {
    await this.users.update(id, { headerURL: fileURL });
    return fileURL;
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
