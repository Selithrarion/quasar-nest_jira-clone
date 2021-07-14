import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';

export interface UserModel extends BaseModel {
  name: string;
  email: string;
  locale: string;
  isActive: boolean;
  avatarURL: string;
  assignedIssues?: IssueModel[];
  favoriteProjectsIDs: number[];
}
