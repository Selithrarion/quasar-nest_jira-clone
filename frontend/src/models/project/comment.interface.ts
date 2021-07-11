import { UserInterface } from 'src/models/user/user.interface';

export interface CommentInterface {
  readonly id: number;
  author: UserInterface;
  text: string;
}
