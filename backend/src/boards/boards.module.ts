import {forwardRef, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { BoardEntity } from './entity/board.entity';
import { ProjectsModule } from '../projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity]), forwardRef(() => ProjectsModule)],
  exports: [BoardsService],
  providers: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
