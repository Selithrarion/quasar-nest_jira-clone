import { ProjectInterface } from 'components/project/models/project.interface';
import { AccessInterface } from 'src/models/access.interface';
import { UserInterface } from 'components/user/models/user.interface';
import { GadgetsTuple } from 'components/dashboard/models/gadget.interface';

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
