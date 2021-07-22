import { IsString, MaxLength } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BoardEntity } from '../../boards/entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CreateProjectDTO } from './create-project.dto';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @ApiProperty({ required: false })
  @IsString()
  boards?: BoardEntity[];

  @ApiProperty({ required: false })
  @IsString()
  avatarURL?: string;

  @ApiProperty({ required: false })
  @IsString()
  leader?: UserEntity;
}
