import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CommentEntity } from './comment.entity';

@Entity()
export class IssueEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  description?: string;

  @Column()
  environment?: string;

  @Column()
  attachments?: string;

  @Column()
  watchNumber: number;

  @Column({ array: true, default: [] })
  watchers: UserEntity;

  @Column({ array: true, default: [] })
  comments?: CommentEntity;

  @Column()
  priority: IssuePriorityInterface;

  @Column()
  author: UserEntity;

  @Column()
  assigned: UserEntity;
}

export interface IssuePriorityInterface {
  readonly id: number;
  name: string;
}
