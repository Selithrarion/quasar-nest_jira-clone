import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserEntity } from './entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
