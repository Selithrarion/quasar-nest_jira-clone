import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { IssueEntity } from './entity/issue.entity';

import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity]), UserModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
