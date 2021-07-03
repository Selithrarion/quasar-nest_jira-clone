import { CommentInterface } from 'components/project/models/comment.interface';
import { UserInterface } from 'components/user/models/user.interface';

export interface IssueInterface {
  readonly id: number;
  name: string;
  description?: string;
  environment?: string;
  attachments?: string;

  watchNumber: number;
  watchers: UserInterface[];
  // dependentIssues:
  comments?: CommentInterface[];

  priority: IssuePriorityInterface;
  author: UserInterface;
  assigned: UserInterface;
  createdAt: number;
  updatedAt: number;
}

export interface IssuePriorityInterface {
  readonly id: number;
  name: string;
}
