import { BaseModel } from 'src/models/common/base.model';

export enum NotificationTypes {
  NEWS = 'news',

  ISSUE_ASSIGN = 'issueAssign',
  ISSUE_WATCH_UPDATE = 'issueWatchUpdate',

  PROJECT_ADD = 'projectAdd',
  PROJECT_DELETE = 'projectDelete',

  TEAM_ADD = 'teamAdd',
  TEAM_DELETE = 'teamDelete',
}

export interface NotificationModel extends BaseModel {
  type: NotificationTypes;
  read: boolean;
}
