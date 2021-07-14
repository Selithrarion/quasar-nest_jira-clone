import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';
import { IssueEntity } from '../../projects/entity/issue.entity';
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
  avatarURL: string;

  @OneToMany(() => IssueEntity, (issue) => issue.assigned)
  assignedIssues: IssueEntity[];

  @ManyToMany(() => ProjectEntity)
  @JoinTable()
  favoriteProjectsIDs: number[];
}
