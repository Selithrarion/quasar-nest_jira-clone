import { BaseModel } from 'src/models/common/base.model';
import { ProjectModel } from 'src/models/project/project.model';
import { AccessEnum } from 'src/models/common/access.model';
import { UserModel } from 'src/models/user/user.model';
import { GadgetsTuple } from 'src/models/dashboard/gadget.model';

export interface DashboardModel extends BaseModel{
  name: string;
  favorite: boolean;
  marksCount: number;
  gadgets: GadgetsTuple;
  project: ProjectModel;
  accessID: AccessEnum;
  leader: UserModel;
}

export interface DashboardDTO {
  name?: string;
  description?: string;
  accessID?: number;
}
