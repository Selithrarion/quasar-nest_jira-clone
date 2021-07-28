import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';

export interface UserModel extends BaseModel {
  name: string;
  password: string;
  email: string;
  locale: string;
  isActive: boolean;
  avatarURL: string | null;
  assignedIssues: IssueModel[];
  watchingIssues: IssueModel[];
  projectsIDs: number[];
  favoriteProjectsIDs: number[];
}
