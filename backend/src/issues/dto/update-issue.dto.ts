import { PartialType } from '@nestjs/swagger';
import { CreateIssueDTO } from './create-issue.dto';

export class UpdateIssueDTO extends PartialType(CreateIssueDTO) {}
