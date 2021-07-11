import { UserModel } from 'src/models/user/user.model';

export interface CommentModel {
  readonly id: number;
  author: UserModel;
  text: string;
}
