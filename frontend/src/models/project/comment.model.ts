import { BaseModel } from 'src/models/common/base.model';
import { UserModel } from 'src/models/user/user.model';
import { IssueModel } from 'src/models/project/issue.model';

export interface CommentModel extends BaseModel {
  text: string;
  author: UserModel;
  issue: IssueModel;
}
