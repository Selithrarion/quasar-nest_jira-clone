import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: true })
  @IsNumber()
  @IsNotEmpty()
  projectID: number
}
