import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilesService } from './files.service';
import { PublicFileEntity } from './entity/public-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PublicFileEntity])],
  providers: [FilesService],
  exports: [FilesService],
})
export class FilesModule {}
