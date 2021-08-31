import { IsString } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

import { BoardEntity } from '../../boards/entity/board.entity';
import { UserEntity } from '../../user/entity/user.entity';
import { CreateProjectDTO } from './create-project.dto';
import { PublicFileEntity } from '../../files/entity/public-file.entity';

export class UpdateProjectDTO extends PartialType(CreateProjectDTO) {
  @ApiProperty({ required: false })
  boards: BoardEntity[];

  @ApiProperty({ required: false })
  @IsString()
  avatar: PublicFileEntity;

  @ApiProperty({ required: false })
  leader: UserEntity;
}
