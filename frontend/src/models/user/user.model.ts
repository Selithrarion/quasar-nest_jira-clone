import { BaseModel } from 'src/models/common/base.model';
import { IssueModel } from 'src/models/project/issue.model';
import { PublicFileModel } from '../common/public.file.model';
import { TeamModel } from 'src/models/user/team.model';
import { ProjectModel } from 'src/models/project/project.model';

export interface UserModel extends BaseModel {
  name: string;
  username: string;
  password: string;
  email: string;
  locale: string;

  isActive: boolean;
  isEmailConfirmed: boolean;
  isOAuthAccount: boolean;
  isTwoFactorEnabled: boolean;

  color: string;
  avatar: PublicFileModel | null;
  header: PublicFileModel | null;

  assignedIssues?: IssueModel[];
  watchingIssues?: IssueModel[];

  projects?: ProjectModel[];
  projectsIDs: number[];
  favoriteProjectsIDs: number[];
  teams?: TeamModel[];
  teamsLeader?: TeamModel[];
  teamsLeaderIDs: number[];

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
