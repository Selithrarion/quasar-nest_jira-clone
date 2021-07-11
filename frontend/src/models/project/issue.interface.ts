import { CommentInterface } from 'src/models/project/comment.interface';
import { UserInterface } from 'src/models/user/user.interface';

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
