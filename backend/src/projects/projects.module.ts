import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

import { BoardsModule } from '../boards/boards.module';

import { ProjectEntity } from './entity/project.entity';
import { UserEntity } from '../user/entity/user.entity';
import { BoardEntity } from '../boards/entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, BoardEntity, UserEntity]), forwardRef(() => BoardsModule)],
  exports: [ProjectsService],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
