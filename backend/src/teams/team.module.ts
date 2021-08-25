import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './entity/team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

import { UserModule } from '../user/user.module';
import { FilesModule } from '../files/files.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), UserModule, FilesModule],
  exports: [TeamService],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
