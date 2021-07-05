import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectEntity } from './entity/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ProjectEntity])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
})
export class ProjectsModule {}
