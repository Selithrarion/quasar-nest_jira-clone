import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from '../entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateProjectDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(10)
  key: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  favorite: boolean;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  board: BoardEntity;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  avatarURL: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  leader: UserEntity;
}
