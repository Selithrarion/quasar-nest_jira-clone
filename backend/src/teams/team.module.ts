import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TeamEntity } from './entity/team.entity';
import { teamRepository } from './team.service';
import { TeamController } from './team.controller';

import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), UserModule],
  exports: [teamRepository],
  providers: [teamRepository],
  controllers: [TeamController],
})
export class TeamModule {}
