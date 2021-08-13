import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class CommentEntity extends BaseEntity {
  @Column()
  text: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
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
