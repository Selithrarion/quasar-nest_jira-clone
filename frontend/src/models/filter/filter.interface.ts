import { ProjectModel } from 'src/models/project/project.model';
import { UserModel } from 'src/models/user/user.model';
import { AccessEnum } from 'src/models/common/access.model';

export interface FilterInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  favoriteCount: number;
  project: ProjectModel;
  accessID: AccessEnum;
  leader: UserModel;
}
