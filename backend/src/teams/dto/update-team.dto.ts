import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTeamDTO {
  @ApiProperty()
  @IsString()
  name: string;
}
