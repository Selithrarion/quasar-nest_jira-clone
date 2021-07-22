import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateColumnDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  boardID: number;
}
