import { ProjectInterface } from 'src/models/project/project.interface';
import { AccessInterface } from 'src/models/common/access.interface';
import { UserInterface } from 'src/models/user/user.interface';

export interface FilterInterface {
  readonly id: number;
  name: string;
  favorite: boolean;
  favoriteCount: number;
  project: ProjectInterface;
  access: AccessInterface;
  leader: UserInterface;
}
