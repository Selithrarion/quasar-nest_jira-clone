import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { ColumnEntity } from '../../columns/entity/column.entity';
import { ProjectEntity } from '../../projects/entity/project.entity';

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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'projectID' })
  project: ProjectEntity;
}
