import { BaseModel } from 'src/models/common/base.model';
import { ProjectModel } from 'src/models/project/project.model';
import { UserModel } from 'src/models/user/user.model';
import { AccessEnum } from 'src/models/common/access.model';

export interface FilterInterface extends BaseModel{
  name: string;
  favorite: boolean;
  favoriteCount: number;
  project: ProjectModel;
  accessID: AccessEnum;
  leader: UserModel;
}
