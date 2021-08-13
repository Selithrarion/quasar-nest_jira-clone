import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { IssueEntity } from './entity/issue.entity';

import { UserModule } from '../user/user.module';
import { CommentEntity } from './entity/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([IssueEntity, CommentEntity]), UserModule],
  controllers: [IssuesController],
  providers: [IssuesService],
})
export class IssuesModule {}
