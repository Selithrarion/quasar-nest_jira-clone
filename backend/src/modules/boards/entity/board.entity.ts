import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, RelationId } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';
import { ColumnEntity } from '../../columns/entity/column.entity';
import { ProjectEntity } from '../../projects/entity/project.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class BoardEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  favorite: boolean;

  @OneToMany(() => ColumnEntity, (column) => column.board, {
    cascade: true,
  })
  columns: ColumnEntity[];

  @ManyToOne(() => ProjectEntity, (project) => project.boards, {
    nullable: false,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectID' })
  project: ProjectEntity;
  @RelationId('project')
  projectID: number;

  @ManyToMany(() => UserEntity, (user) => user.favoriteBoards, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  users: UserEntity[];
}
