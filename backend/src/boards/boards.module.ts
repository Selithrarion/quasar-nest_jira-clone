import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './entity/board.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
