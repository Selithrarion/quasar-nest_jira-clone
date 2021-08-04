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

  accessToken?: string;
  refreshToken?: string;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}
export interface UserRegisterDTO {
  name: string;
  username: string;
  password: string;
  email: string;
}
export interface UserAuthResponse {
  user: UserModel;
  accessToken: string;
  refreshToken: string;
}
export interface UserUpdateTokenResponse {
  accessToken: string;
  refreshToken: string;
}
export interface UserUpdateTokenDTO {
  userID: number;
  refreshToken: string;
}
