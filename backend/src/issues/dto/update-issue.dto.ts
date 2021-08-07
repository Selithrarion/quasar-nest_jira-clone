import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateIssueDTO } from './create-issue.dto';
import { ColumnEntity } from '../../columns/entity/column.entity';

export class UpdateIssueDTO extends PartialType(CreateIssueDTO) {
  @ApiProperty()
  column: ColumnEntity;
}
