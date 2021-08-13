import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IssueEntity } from '../entity/issue.entity';

export class CreateCommentDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  text: string;
}
