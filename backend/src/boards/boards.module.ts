import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './entity/board.entity';

import { ProjectsModule } from '../projects/projects.module';
import { ColumnsModule } from '../columns/columns.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardEntity]),
    forwardRef(() => ProjectsModule),
    forwardRef(() => ColumnsModule),
    UserModule,
  ],
  exports: [BoardsService],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
