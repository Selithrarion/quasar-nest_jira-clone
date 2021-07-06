import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { IsEmail } from 'class-validator';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  locale: string;

  @Column()
  isActive: boolean;

  @Column()
  avatarURL: string;
}
