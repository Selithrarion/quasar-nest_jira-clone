import { BeforeInsert, Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { BaseEntity } from '../../../common/types/base.entity';
import { BoardEntity } from '../../boards/entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { AccessEnum } from '../../../common/types/access.model';
import { PublicFileEntity } from '../../files/entity/public-file.entity';
import { IssueEntity } from '../../issues/entity/issue.entity';
import stringToHslColor from '../../../common/utils/stringToHslColor';

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

  @JoinColumn()
  @OneToOne(() => PublicFileEntity, {
    eager: true,
    nullable: true,
  })
  avatar: PublicFileEntity | null;

  @Column({ default: '#b3e6ff' })
  color: string;
  @BeforeInsert()
  async generateColor(): Promise<void> {
    this.color = stringToHslColor(this.name);
  }

  @ManyToOne(() => UserEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'leaderID' })
  leader: UserEntity;

  @ManyToMany(() => UserEntity, (user) => user.projects, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  users: UserEntity[];

  @OneToMany(() => IssueEntity, (issue) => issue.project, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  issues: IssueEntity[];
}
