import { UserInterface } from 'components/user/models/user.interface';

export interface CommentInterface {
  readonly id: number;
  author: UserInterface;
  text: string;
}
