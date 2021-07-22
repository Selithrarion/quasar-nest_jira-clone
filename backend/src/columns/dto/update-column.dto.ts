import { PartialType } from '@nestjs/swagger';
import { CreateColumnDTO } from './create-column.dto';

export class UpdateColumnDTO extends PartialType(CreateColumnDTO) {}
