import { ProjectInterface } from 'components/project/models/project.interface';
import { AccessInterface } from 'src/models/access.interface';
import { UserInterface } from 'components/user/models/user.interface';

export interface FilterInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  favoriteCount: number;
  project: ProjectInterface;
  access: AccessInterface;
  leader: UserInterface;
}
