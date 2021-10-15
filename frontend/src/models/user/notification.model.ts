import { BaseModel } from 'src/models/common/base.model';

export enum NotificationTypes {
  NEWS = 1,

  ISSUE_ASSIGN,
  ISSUE_WATCH_UPDATE,

  PROJECT_ADD,
  PROJECT_DELETE,

  TEAM_ADD,
  TEAM_DELETE,
}

export interface NotificationModel extends BaseModel {
  typeID: NotificationTypes;
  read: boolean;
}
