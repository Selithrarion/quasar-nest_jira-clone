import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ColumnEntity } from '../../projects/entity/column.entity';
import { ProjectEntity } from '../../projects/entity/project.entity';

@Entity()
export class BoardEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ default: false })
  favorite: boolean;

  @OneToMany(() => ColumnEntity, (column) => column.board)
  columns: ColumnEntity[];

  @ManyToOne(() => ProjectEntity, (project) => project.boards)
  @JoinColumn({ name: 'projectID' })
  project: ProjectEntity;
}