import { Column, Entity, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { BoardEntity } from './board.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  key: string;

  @Column()
  type: string;

  @Column()
  favorite: boolean;

  @ManyToOne((type) => BoardEntity, (board) => board.project)
  boards: BoardEntity[];

  @Column()
  avatarURL: string;

  @Column()
  leader: UserEntity;
}
