import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entity/project.entity';

import { BoardsModule } from '../boards/boards.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity]), forwardRef(() => BoardsModule), UserModule],
  exports: [ProjectsService],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
