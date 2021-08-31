import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';
import { UserSearchService } from './user-search.service';
import { UserController } from './user.controller';

import { FilesModule } from '../files/files.module';
import { SearchModule } from '../../services/search/search.module';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), FilesModule, SearchModule],
  exports: [UserService],
  providers: [UserService, UserSearchService],
  controllers: [UserController],
})
export class UserModule {}
