import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ColumnEntity } from './entity/column.entity';

import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [TypeOrmModule.forFeature([ColumnEntity]), forwardRef(() => BoardsModule)],
  exports: [ColumnsService],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}
