import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IssueEntity } from './issue.entity';

@Entity()
export class ColumnEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({ array: true, default: [] })
  issues: IssueEntity;
}
