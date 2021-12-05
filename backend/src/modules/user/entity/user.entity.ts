import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  RelationId,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsEmail } from 'class-validator';

import { BaseEntity } from '../../../common/types/base.entity';
import { IssueEntity } from '../../issues/entity/issue.entity';
import { ProjectEntity } from '../../projects/entity/project.entity';
import { BoardEntity } from '../../boards/entity/board.entity';
import { Exclude } from 'class-transformer';
import { TeamEntity } from '../../teams/entity/team.entity';
import { CommentEntity } from '../../issues/entity/comment.entity';
import { PublicFileEntity } from '../../files/entity/public-file.entity';
import stringToHslColor from '../../../common/utils/stringToHslColor';
import { NotificationEntity } from '../../notifications/entity/notification.entity';

export interface UserGoogleData {
  email: string;
  picture: string;
}

export interface UserOTP {
  secret: string;
  otpURL: string;
}

export interface UserValidationDTO {
  readonly email: string;
  readonly password: string;
}
export interface UserTokensInterface {
  readonly user?: UserEntity;
  readonly accessToken: string;
  readonly refreshToken: string;
}
export interface UserUpdateTokensDTO {
  readonly userID: number;
  readonly email: string;
  readonly refreshToken: string;
}
export interface UserJwtPayload {
  readonly id: number;
  readonly email: string;
  readonly is2FAEnabled: boolean;
}

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ length: 64 })
  name: string;

  @Column({ length: 24, unique: true })
  @Index()
  username: string;

  @Column({ unique: true })
  @IsEmail()
  @Index()
  email: string;

  @Exclude()
  @Column({ nullable: true, length: 128 })
  password: string;
  @BeforeInsert()
  async hashPassword(): Promise<void> {
    if (this.password) this.password = await bcrypt.hash(this.password, 10);
  }
  async validatePassword(password: string): Promise<boolean> {
    if (this.isOAuthAccount) return true;
    return bcrypt.compare(password, this.password);
  }

  @Exclude()
  @Column({ nullable: true })
  hashedRefreshToken: string;

  @Column({ default: false })
  isTwoFactorEnabled: boolean;
  @Exclude()
  @Column({ nullable: true })
  twoFactorSecret: string;

  @Column({ nullable: true })
  locale: string;
  @Column({ default: true })
  isActive: boolean;
  @Column({ default: false })
  isEmailConfirmed: boolean;

  @Column({ default: false })
  isOAuthAccount: boolean;
  @Exclude()
  @Column({ default: false })
  isGoogleAccount: boolean;
  @Exclude()
  @Column({ default: false })
  isGithubAccount: boolean;

  @Column({ default: '#b3e6ff' })
  color: string;
  @BeforeInsert()
  async generateColor(): Promise<void> {
    this.color = stringToHslColor(this.username);
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
  @RelationId('projects')
  projectIDs: number[];

  @ManyToMany(() => ProjectEntity, (project) => project.users)
  @JoinTable()
  favoriteProjects: ProjectEntity[];
  @RelationId('favoriteProjects')
  favoriteProjectIDs: number[];

  @ManyToMany(() => BoardEntity, (board) => board.users)
  @JoinTable()
  favoriteBoards: BoardEntity[];
  @RelationId('favoriteBoards')
  favoriteBoardIDs: number[];

  @Column({ nullable: true })
  position: string;
  @Column({ nullable: true })
  department: string;
  @Column({ nullable: true })
  organisation: string;
  @Column({ nullable: true })
  location: string;

  @OneToMany(() => CommentEntity, (comment) => comment.author, {
    cascade: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  comments: CommentEntity[];

  @ManyToMany(() => TeamEntity, (team) => team.users, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  teams: TeamEntity[];

  @ManyToOne(() => TeamEntity, (team) => team.leader, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  teamsLeader: TeamEntity[];
  @RelationId('teamsLeader')
  teamsLeaderIDs: number[];

  @OneToMany(() => NotificationEntity, (notification) => notification.user, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  notifications: NotificationEntity[];
}
