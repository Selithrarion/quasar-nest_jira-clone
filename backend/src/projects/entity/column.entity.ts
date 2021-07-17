import {Column, Entity, JoinColumn, ManyToOne, OneToMany} from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IssueEntity } from './issue.entity';
import { BoardEntity } from '../../boards/entity/board.entity';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column()
  name: string;

  @ManyToOne(() => BoardEntity, (board) => board.columns)
  @JoinColumn({ name: 'boardID' })
  board: BoardEntity;

  @OneToMany(() => IssueEntity, (issue) => issue.column, {
    eager: true,
    cascade: true,
  })
  issues: IssueEntity[];
}
