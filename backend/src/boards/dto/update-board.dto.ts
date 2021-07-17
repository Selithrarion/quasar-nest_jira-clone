import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ColumnEntity } from '../../projects/entity/column.entity';

export class UpdateBoardDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name?: string;

  @ApiProperty()
  @IsNotEmpty()
  columns?: ColumnEntity[];

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  projectID?: number;
}
