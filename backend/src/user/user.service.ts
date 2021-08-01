import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly users: Repository<UserEntity>
  ) {}

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.users.findOne({ where: { email } });
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.users.findOne(id);
  }

  async create(payload: CreateUserDTO): Promise<UserEntity> {
    const isUserAlreadyExist = await this.users.findOne({ where: { email: payload.email } });
    // temporarily delete existing user to test
    if (isUserAlreadyExist) await this.users.delete(isUserAlreadyExist.id);
    // if (isUserAlreadyExist) throw new HttpException('USER_ALREADY_EXIST', HttpStatus.UNAUTHORIZED);

    const user = await this.users.create(payload);
    const createdUser = await this.users.save(user);
    // delete createdUser.password
    return createdUser;
  }
}
