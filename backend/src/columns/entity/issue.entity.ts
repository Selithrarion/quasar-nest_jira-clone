import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CommentEntity } from './comment.entity';
import { ColumnEntity } from './column.entity';

export enum IssuePriorityEnum {
  LOWEST = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 4,
  HIGHEST = 5,
}

@Entity()
export class IssueEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  description?: string;

  @Column()
  environment?: string;

  @Column()
  attachments?: string;

  @Column()
  watchNumber: number;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  watchers: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.issue)
  comments: CommentEntity[];

  @Column({ type: 'enum', enum: IssuePriorityEnum, default: IssuePriorityEnum.MEDIUM })
  priority: IssuePriorityEnum;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  author: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignedIssues, {
    eager: true,
  })
  assigned: UserEntity;

  @ManyToOne(() => ColumnEntity, (column) => column.issues, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'columnID' })
  column: ColumnEntity;
}
