import { PartialType } from '@nestjs/swagger';
import { CreateCommentDTO } from './create-comment.dto';

export class UpdateCommentDTO extends PartialType(CreateCommentDTO) {}
