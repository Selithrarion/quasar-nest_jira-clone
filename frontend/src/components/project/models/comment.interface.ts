import { UserInterface } from 'components/user/models/user.interface';

export default interface CommentInterface {
  readonly id: number;
  author: UserInterface;
  text: string;
}
