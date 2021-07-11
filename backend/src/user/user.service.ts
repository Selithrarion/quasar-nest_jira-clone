import { Injectable } from '@nestjs/common';
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
    return await this.users.findOneOrFail({ email });
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.users.findOneOrFail({ id });
  }

  async create(userData: CreateUserDTO): Promise<UserEntity> {
    const createdUser = await this.users.create(userData);
    await this.users.save(createdUser);
    return createdUser;
  }
}
