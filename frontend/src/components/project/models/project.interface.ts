import { AvatarSizesInterface, UserInterface } from 'components/user/models/user.interface';
import BoardInterface from 'components/project/models/board.interface';

export interface ProjectInterface {
  readonly id: number;
  name: string;
  key: string;
  type: string;
  favorite: boolean;
  // boards: BoardInterface[];
  avatarURLs: AvatarSizesInterface;
  leader: UserInterface;
}
