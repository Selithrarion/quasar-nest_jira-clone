import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from '../../projects/entity/project.entity';

export class CreateBoardDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  project: ProjectEntity;
}
