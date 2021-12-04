import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  // TODO: user not delete if there are some comments
  @ManyToOne(() => UserEntity, (user) => user.comments, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'authorID' })
  author: UserEntity;

  @ManyToOne(() => IssueEntity, (issue) => issue.comments, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'issueID' })
  issue: IssueEntity;
}
