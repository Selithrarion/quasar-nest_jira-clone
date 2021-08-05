import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { BoardEntity } from '../../boards/entity/board.entity';
import { IssueEntity } from '../../issues/entity/issue.entity';

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
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  issues: IssueEntity[];
}
