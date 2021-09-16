import { ClassSerializerInterceptor, Global, HttpException, HttpStatus, Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProjectsModule } from './modules/projects/projects.module';
import { UserModule } from './modules/user/user.module';
import { TeamModule } from './modules/teams/team.module';
import { BoardsModule } from './modules/boards/boards.module';
import { ColumnsModule } from './modules/columns/columns.module';
import { IssuesModule } from './modules/issues/issues.module';

import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './modules/auth/guard/jwt-auth.guard';

import { ScheduleModule } from '@nestjs/schedule';
import { EmailScheduleModule } from './modules/email-schedule/email-schedule.module';
import { EmailVerificationModule } from './modules/email-verification/email-verification.module';

import { SearchModule } from './services/search/search.module';
import { EmailModule } from './services/email/email.module';
import { TwoFactorAuthModule } from './modules/two-factor-auth/two-factor-auth.module';

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
      database: process.env.POSTGRES_DB,
      entities: ['dist/**/entity/*.entity{.ts,.js}'],
      synchronize: true,
    }),

    ProjectsModule,
    UserModule,
    TeamModule,
    BoardsModule,
    ColumnsModule,
    IssuesModule,
    AuthModule,

    ScheduleModule.forRoot(),
    EmailScheduleModule,

    SearchModule,
    EmailModule,
    EmailVerificationModule,
    TwoFactorAuthModule,
  ],
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
