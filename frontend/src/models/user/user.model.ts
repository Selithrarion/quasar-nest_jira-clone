import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';
import { PublicFileModel } from '../common/public.file.model';

export interface UserModel extends BaseModel {
  name: string;
  username: string;
  password: string;
  email: string;
  locale: string;
  isActive: boolean;

  color: string;
  avatar: PublicFileModel | null;
  header: PublicFileModel | null;

  assignedIssues: IssueModel[];
  watchingIssues: IssueModel[];
  projectsIDs: number[];
  favoriteProjectsIDs: number[];

  position: string;
  department: string;
  organisation: string;
  location: string;

  accessToken?: string;
  refreshToken?: string;
}

export interface UserDTO {
  username?: string;
  name?: string;
  avatar?: PublicFileModel;
  header?: PublicFileModel;
  position?: string;
  department?: string;
  organisation?: string;
  location?: string;
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
