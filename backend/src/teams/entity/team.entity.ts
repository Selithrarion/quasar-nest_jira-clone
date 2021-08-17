import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, RelationId } from 'typeorm';

import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../../user/entity/user.entity';

@Entity()
export class TeamEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

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