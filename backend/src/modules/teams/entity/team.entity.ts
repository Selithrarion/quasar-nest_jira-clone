import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';

import { BaseEntity } from '../../../common/types/base.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { PublicFileEntity } from '../../files/entity/public-file.entity';
import stringToHslColor from '../../../common/utils/stringToHslColor';

@Entity()
export class TeamEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

  @Column({ default: '#b3e6ff' })
  color: string;
  @BeforeInsert()
  async generateColor(): Promise<void> {
    this.color = stringToHslColor(this.name);
  }

  @OneToOne(() => PublicFileEntity, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  avatar: PublicFileEntity;

  @OneToOne(() => PublicFileEntity, {
    eager: true,
    nullable: true,
  })
  @JoinColumn()
  header: PublicFileEntity;

  @ManyToMany(() => UserEntity, (user) => user.teams, {
    eager: true,
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  users: UserEntity[];

  @OneToMany(() => UserEntity, (user) => user.teamsLeader, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'leaderID' })
  leader: UserEntity;

  @RelationId('leader')
  leaderID: number;
}
