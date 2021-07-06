import { Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ColumnEntity } from './column.entity';
import { ProjectEntity } from './project.entity';

@Entity()
export class BoardEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  favorite: boolean;

  @Column({ array: true, default: [] })
  columns: ColumnEntity;

  @OneToMany((type) => ProjectEntity, (project) => project.boards)
  project: ProjectEntity;
}
