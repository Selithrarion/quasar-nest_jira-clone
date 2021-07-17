import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { BoardEntity } from '../../boards/entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';

export class UpdateProjectDTO {
  @ApiProperty()
  @IsString()
  @MaxLength(100)
  name?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(10)
  key?: string;

  @ApiProperty()
  @IsString()
  boards?: BoardEntity[];

  @ApiProperty()
  @IsString()
  avatarURL?: string;

  @ApiProperty()
  @IsString()
  leader?: UserEntity;
}
