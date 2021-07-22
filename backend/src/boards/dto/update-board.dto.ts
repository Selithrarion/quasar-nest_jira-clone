import { IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';
import { ColumnEntity } from '../../columns/entity/column.entity';
import { CreateBoardDTO } from './create-board.dto';

export class UpdateBoardDTO extends PartialType(CreateBoardDTO) {
  @ApiProperty({ required: false })
  @IsNotEmpty()
  columns?: ColumnEntity[];
}
