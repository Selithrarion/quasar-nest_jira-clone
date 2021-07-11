import { CommentModel } from 'src/models/project/comment.model';
import { UserModel } from 'src/models/user/user.model';

export interface IssueModel {
  readonly id: number;
  name: string;
  description?: string;
  environment?: string;
  attachments?: string;

  watchNumber: number;
  watchers: UserModel[];
  // dependentIssues:
  comments?: CommentModel[];

  priority: IssuePriorityInterface;
  author: UserModel;
  assigned: UserModel;
  createdAt: number;
  updatedAt: number;
}

export interface IssuePriorityInterface {
  readonly id: number;
  name: string;
}

export interface IssueDTO {
  name: string;
  description?: string;
  environment?: string;
  attachments?: string;

  watchNumber: number;
  watchers: UserModel[];
  comments: CommentModel[];

  priority: IssuePriorityInterface;
  author: UserModel;
  assigned: UserModel;
}
