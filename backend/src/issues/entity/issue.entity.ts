import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CommentEntity } from '../../columns/entity/comment.entity';
import { ColumnEntity } from '../../columns/entity/column.entity';

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

@Entity()
export class IssueEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  key: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  environment: string;

  @Column({ nullable: true })
  attachments: string;

  @ManyToMany(() => UserEntity, (user) => user.watchingIssues)
  @JoinTable()
  watchers: UserEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.issue)
  comments: CommentEntity[];

  @Column({ type: 'enum', enum: IssueTypeEnum, default: IssueTypeEnum.BUG })
  type: IssueTypeEnum;

  @Column({ type: 'enum', enum: IssuePriorityEnum, default: IssuePriorityEnum.MEDIUM })
  priority: IssuePriorityEnum;

  @ManyToOne(() => UserEntity, {
    eager: true,
  })
  @JoinColumn({ name: 'authorID' })
  author: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.assignedIssues, {
    nullable: true,
    eager: true,
  })
  @JoinColumn({ name: 'assignedID' })
  assigned: UserEntity;

  @ManyToOne(() => ColumnEntity, (column) => column.issues, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'columnID' })
  column: ColumnEntity;
}
