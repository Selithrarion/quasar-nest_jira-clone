import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IsEmail } from 'class-validator';
import { Exclude } from 'class-transformer';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string

  @Column()
  locale: string;

  @Column()
  isActive: boolean;

  @Column()
  avatarURL: string;
}
