import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';

@Entity()
export class PublicFileEntity extends BaseEntity {
  @Column()
  url: string;

  @Column()
  key: string;
}
