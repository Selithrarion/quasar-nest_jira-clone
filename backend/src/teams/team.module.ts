import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './entity/team.entity';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';

import { UserService } from '../user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), UserService],
  exports: [TeamService],
  providers: [TeamService],
  controllers: [TeamController],
})
export class TeamModule {}
