import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { UserEntity } from '../../user/entity/user.entity';

export class CreateTeamDTO {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  @MaxLength(64)
  name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  users: UserEntity[];
}
