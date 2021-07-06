import { Column } from 'typeorm';
import { UserEntity } from '../../user/entity/user.entity';
import { BaseEntity } from '../../common/base.entity';

export class CommentEntity extends BaseEntity {
  @Column()
  author: UserEntity;

  @Column()
  text: string;
}
