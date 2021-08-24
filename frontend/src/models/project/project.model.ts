import { BaseModel } from 'src/models/common/base.model';

import { BoardModel } from 'src/models/project/board.model';
import { UserModel } from 'src/models/user/user.model';
import { AccessEnum } from 'src/models/common/access.model';
import { PublicFileModel } from '../common/public.file.model';

export enum ProjectTemplateEnum {
  KANBAN = 1,
  SCRUM = 2,
}

export enum ProjectTypeEnum {
  TEAM = 1,
  SOFTWARE = 2,
}

export interface ProjectModel extends BaseModel {
  name: string;
  key: string;
  favorite: boolean;
  avatar: PublicFileModel | null;

  accessID: AccessEnum;
  templateID: ProjectTemplateEnum;
  typeID: ProjectTypeEnum;

  boards: BoardModel[];

  leader: UserModel;
  users: UserModel[];
}

export interface ProjectDTO {
  name: string;
  key: string;
  accessID: number;
  templateID: number;
  typeID: number;
  boards: BoardModel;
  avatar: File;
  leader: UserModel;
}
