import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projects/projects.module';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProjectsModule, UserModule, BoardsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
