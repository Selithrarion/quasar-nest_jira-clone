import { BaseModel } from 'src/models/common/base.model';
import { CommentModel } from 'src/models/project/comment.model';
import { UserModel } from 'src/models/user/user.model';
import { BoardModel } from 'src/models/project/board.model';
import { ProjectModel } from 'src/models/project/project.model';
import { ColumnModel } from 'src/models/project/column.model';

export interface IssueModel extends BaseModel {
  name: string;
  key: string;
  description?: string;
  environment?: string;
  attachments?: string;

  watchers: UserModel[];
  comments: CommentModel[];

  typeID: IssueTypeEnum;
  priorityID: IssuePriorityEnum;
  author: UserModel;
  assigned: UserModel;
  columnID: number;
  projectID: number;
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

  project: ProjectModel;
  board: BoardModel;
  column: ColumnModel;

  priorityID: IssuePriorityEnum;
  typeID: IssueTypeEnum;
  author: UserModel;
  assigned: UserModel;
}
