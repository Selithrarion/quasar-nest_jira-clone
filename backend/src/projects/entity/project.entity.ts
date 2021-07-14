import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { BoardEntity } from './board.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { AccessEnum } from '../../common/access.model';

export enum ProjectTemplateEnum {
  KANBAN = 1,
  SCRUM = 2,
}

export enum ProjectTypeEnum {
  TEAM = 1,
  SOFTWARE = 2,
}

@Entity()
export class ProjectEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  key: string;

  @Column({ default: false })
  favorite: boolean;

  @Column({ type: 'enum', enum: AccessEnum })
  accessID: AccessEnum;

  @Column({ type: 'enum', enum: ProjectTemplateEnum })
  templateID: ProjectTemplateEnum;

  @Column({ type: 'enum', enum: ProjectTypeEnum })
  typeID: ProjectTypeEnum;

  @OneToMany(() => BoardEntity, (board) => board.project, {
    eager: true,
    cascade: true,
  })
  boards: BoardEntity[];

  @Column({ nullable: true })
  avatarURL: string;

  @ManyToOne(() => UserEntity, {
    eager: true,
    cascade: true,
  })
  leader: UserEntity;
}
