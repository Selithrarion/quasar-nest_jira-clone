import { ProjectInterface } from 'src/models/project/project.interface';
import { AccessInterface } from 'src/models/common/access.interface';
import { UserInterface } from 'src/models/user/user.interface';
import { GadgetsTuple } from 'src/models/dashboard/gadget.interface';

export interface DashboardInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  marksCount: number;
  gadgets: GadgetsTuple;
  project: ProjectInterface;
  access: AccessInterface;
  leader: UserInterface;
}

export interface DashboardDTO {
  name: string;
  description: string;
  accessID: number;
}
