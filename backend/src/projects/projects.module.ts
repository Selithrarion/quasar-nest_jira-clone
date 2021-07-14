import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

import { ProjectEntity } from './entity/project.entity';
import { BoardEntity } from './entity/board.entity';
import { ColumnEntity } from './entity/column.entity';
import { CommentEntity } from './entity/comment.entity';
import { IssueEntity } from './entity/issue.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProjectEntity]),
    TypeOrmModule.forFeature([BoardEntity]),
    TypeOrmModule.forFeature([ColumnEntity]),
    TypeOrmModule.forFeature([CommentEntity]),
    TypeOrmModule.forFeature([IssueEntity]),
  ],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
