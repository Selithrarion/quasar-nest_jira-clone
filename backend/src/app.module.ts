import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './projects/projects.module';
import { UserModule } from './user/user.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';

@Module({
  imports: [TypeOrmModule.forRoot(), ProjectsModule, UserModule, BoardsModule, ColumnsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
