import { AvatarSizesInterface, UserInterface } from 'src/models/user/user.interface';
import { BoardInterface } from 'src/models/project/board.interface';

export interface ProjectInterface {
  readonly id: number;
  name: string;
  key: string;
  type: string;
  favorite: boolean;
  boards: BoardInterface[];
  avatarURLs: AvatarSizesInterface;
  leader: UserInterface;
}
