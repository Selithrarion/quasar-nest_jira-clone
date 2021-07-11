import { UserModel } from 'src/models/user/user.model';
import { BoardModel } from 'src/models/project/board.model';

export interface ProjectModel {
  readonly id: number;
  name: string;
  key: string;
  type: string;
  favorite: boolean;
  avatarURL: string;
  boards: BoardModel[];
  leader: UserModel;
}

export interface ProjectDTO {
  name: string;
  key: string;
  favorite: boolean;
  board: BoardModel;
  avatarURL: string;
  leader: UserModel;
}
