import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';

export interface UserModel extends BaseModel {
  name: string;
  username: string;
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

export interface LoginDTO {
  email: string;
  password: string;
}
export interface RegisterDTO {
  name: string;
  username: string;
  password: string;
  email: string;
}
