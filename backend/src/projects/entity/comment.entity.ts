import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'authorID' })
  author: UserEntity;

  @ManyToOne(() => IssueEntity, (issue) => issue.comments)
  @JoinColumn({ name: 'issueID' })
  issue: IssueEntity;
}
