import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ProjectTypeEnum } from '../entity/project.entity';

export class CreateProjectDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  key: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  accessID: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  templateID: number;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  typeID: ProjectTypeEnum;
}
