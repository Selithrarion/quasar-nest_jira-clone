import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { BoardEntity } from '../../boards/entity/board.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => BoardEntity, (board) => board.columns, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'boardID' })
  board: BoardEntity;

  @OneToMany(() => IssueEntity, (issue) => issue.column, {
    eager: true,
    cascade: true,
  })
  issues: IssueEntity[];
}
