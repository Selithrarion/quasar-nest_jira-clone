import { BaseModel } from 'src/models/common/base.model';
import { UserModel } from 'src/models/user/user.model';

export interface CommentModel extends BaseModel {
  text: string;
  author: UserModel;
}
