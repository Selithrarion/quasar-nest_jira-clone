import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';
import { UserEntity } from '../../user/entity/user.entity';

export enum NotificationTypes {
  NEWS = 1,

  ISSUE_ASSIGN,
  ISSUE_WATCH_UPDATE,

  PROJECT_ADD,
  PROJECT_DELETE,

  TEAM_ADD,
  TEAM_DELETE,
}

@Entity()
export class NotificationEntity extends BaseEntity {
  @Column({ type: 'enum', enum: NotificationTypes })
  typeID: NotificationTypes;

  @Column({ default: false })
  read: boolean;

  @ManyToOne(() => UserEntity, {
    cascade: true,
  })
  user: UserEntity;
}
