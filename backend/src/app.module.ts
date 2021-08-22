import { ClassSerializerInterceptor, Global, HttpException, HttpStatus, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { v4 as uuidv4 } from 'uuid';
import { extname } from 'path';
import { Request } from 'express';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { ProjectsModule } from './projects/projects.module';
import { UserModule } from './user/user.module';
import { TeamModule } from './teams/team.module';
import { BoardsModule } from './boards/boards.module';
import { ColumnsModule } from './columns/columns.module';
import { IssuesModule } from './issues/issues.module';
import { AuthModule } from './auth/auth.module';

import { JwtAuthGuard } from './auth/guard/jwt-auth.guard';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: ['dist/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename(
          req: Request,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void
        ): void {
          const fileUniqueName = uuidv4() + extname(file.originalname);
          callback(null, fileUniqueName);
        },
      }),
      fileFilter(req, file, cb) {
        const extension = extname(file.originalname).toLowerCase();
        const isInvalidFileType = extension !== '.jpg' && extension !== '.jpeg' && extension !== 'png';
        if (isInvalidFileType) {
          cb(new HttpException('ONLY_IMAGES_ALLOWED', HttpStatus.NOT_ACCEPTABLE), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 1024 * 1024 * 20,
      },
    }),
    ProjectsModule,
    UserModule,
    TeamModule,
    BoardsModule,
    ColumnsModule,
    IssuesModule,
    AuthModule,
  ],
  exports: [MulterModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
