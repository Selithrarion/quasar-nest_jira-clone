import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

import { ProjectsModule } from '../projects/projects.module';
import { ColumnsModule } from '../columns/columns.module';

import { BoardEntity } from './entity/board.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => ColumnsModule),
  ],
  exports: [BoardsService],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
