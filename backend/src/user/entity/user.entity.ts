import { Column, Entity, JoinTable, ManyToMany, OneToMany, RelationId } from 'typeorm';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

import { BaseEntity } from '../../common/base.entity';
import { IssueEntity } from '../../issues/entity/issue.entity';
import { ProjectEntity } from '../../projects/entity/project.entity';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  locale: string;

  @Column()
  isActive: boolean;

  @Column({ nullable: true })
  avatarURL: string | null;

  @OneToMany(() => IssueEntity, (issue) => issue.assigned)
  assignedIssues: IssueEntity[];

  @ManyToMany(() => IssueEntity, (issue) => issue.watchers)
  watchingIssues: IssueEntity[];

  @ManyToMany(() => ProjectEntity, (project) => project.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable()
  projects: ProjectEntity[];

  @RelationId((user: UserEntity) => user.projects)
  projectIDs: number[];

  @ManyToMany(() => ProjectEntity)
  @JoinTable()
  favoriteProjects: ProjectEntity[];

  @RelationId((user: UserEntity) => user.favoriteProjects)
  favoriteProjectIDs: number[];
}
