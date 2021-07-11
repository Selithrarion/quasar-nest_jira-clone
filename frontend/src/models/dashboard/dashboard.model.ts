import { ProjectModel } from 'src/models/project/project.model';
import { AccessModel } from 'src/models/common/access.model';
import { UserModel } from 'src/models/user/user.model';
import { GadgetsTuple } from 'src/models/dashboard/gadget.model';

export interface DashboardModel {
  readonly id: number;
  name: string;
  favorite: boolean;
  marksCount: number;
  gadgets: GadgetsTuple;
  project: ProjectModel;
  access: AccessModel;
  leader: UserModel;
}

export interface DashboardDTO {
  name: string;
  description: string;
  accessID: number;
}
