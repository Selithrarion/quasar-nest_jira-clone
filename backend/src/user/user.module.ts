import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';

import { UserEntity } from './entity/user.entity';
import { IssueEntity } from '../columns/entity/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, IssueEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
