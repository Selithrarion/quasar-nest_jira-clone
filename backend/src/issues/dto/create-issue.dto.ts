import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { IssuePriorityEnum, IssueTypeEnum } from '../entity/issue.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateIssueDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty()
  @IsString()
  description?: string;

  @ApiProperty()
  @IsString()
  environment?: string;

  @ApiProperty()
  @IsString()
  attachments?: string;

  @ApiProperty({ required: true, enum: IssuePriorityEnum })
  @IsNumber()
  @IsNotEmpty()
  priorityID: IssuePriorityEnum;

  @ApiProperty({ required: true, enum: IssueTypeEnum })
  @IsNumber()
  @IsNotEmpty()
  typeID: IssueTypeEnum;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  projectKey: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  author: UserEntity;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  assigned: UserEntity;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  columnID: number;
}
