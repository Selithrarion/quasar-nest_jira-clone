import { BaseModel } from 'src/models/common/base.model';
import { CommentModel } from 'src/models/project/comment.model';
import { UserModel } from 'src/models/user/user.model';

export interface IssueModel extends BaseModel {
  name: string;
  key: string;
  description?: string;
  environment?: string;
  attachments?: string;

  watchNumber: number;
  watchers: UserModel[];
  comments: CommentModel[];

  type: IssueTypeEnum;
  priority: IssuePriorityEnum;
  author: UserModel;
  assigned: UserModel;
  columnID: number;
}

export enum IssueTypeEnum {
  BUG = 1,
  TASK = 2,
  HISTORY = 3,
  INVESTIGATION = 4,
}
export enum IssuePriorityEnum {
  LOWEST = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  HIGHEST = 5,
}

export interface IssueDTO {
  name: string;

  description?: string;
  environment?: string;
  attachments?: string;

  priority: IssuePriorityEnum;
  authorID: number;
  assignedID: number;
  columnID: number;
}
