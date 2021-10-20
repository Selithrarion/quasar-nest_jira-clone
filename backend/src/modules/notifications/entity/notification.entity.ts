import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';
import { UserEntity } from '../../user/entity/user.entity';

export enum NotificationTypes {
  NEWS = 'news',

  ISSUE_ASSIGN = 'issueAssign',
  ISSUE_WATCH_UPDATE = 'issueWatchUpdate',

  PROJECT_ADD = 'projectAdd',
  PROJECT_DELETE = 'projectDelete',

  TEAM_ADD = 'teamAdd',
  TEAM_DELETE = 'teamDelete',
}

@Entity()
export class NotificationEntity extends BaseEntity {
  @Column({ type: 'enum', enum: NotificationTypes })
  type: NotificationTypes;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => UserEntity, (user) => user.notifications, {
    cascade: true,
  })
  user: UserEntity;
}
