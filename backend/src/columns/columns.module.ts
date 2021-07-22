import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';

import { BoardsModule } from '../boards/boards.module';

import { ColumnEntity } from './entity/column.entity';
import { BoardEntity } from '../boards/entity/board.entity';
import { CommentEntity } from './entity/comment.entity';
import { IssueEntity } from './entity/issue.entity';
import { UserEntity } from '../user/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity, BoardEntity, CommentEntity, IssueEntity, UserEntity]),
    forwardRef(() => BoardsModule),
  ],
  exports: [ColumnsService],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
