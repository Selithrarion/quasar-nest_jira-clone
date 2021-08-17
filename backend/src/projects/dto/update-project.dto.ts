import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BoardEntity } from '../../boards/entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CreateProjectDTO } from './create-project.dto';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @ApiProperty({ required: false })
  boards: BoardEntity[];

  @ApiProperty({ required: false })
  @IsString()
  avatarURL: string;

  @ApiProperty({ required: false })
  leader: UserEntity;
}
