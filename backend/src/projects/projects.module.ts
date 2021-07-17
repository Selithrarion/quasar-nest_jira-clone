import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

import { ProjectEntity } from './entity/project.entity';
import { ColumnEntity } from './entity/column.entity';
import { CommentEntity } from './entity/comment.entity';
import { IssueEntity } from './entity/issue.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity, ColumnEntity, CommentEntity, IssueEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
