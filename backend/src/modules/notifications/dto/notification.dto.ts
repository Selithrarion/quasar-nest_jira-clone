import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

export class UpdateNotificationDTO {
  @ApiProperty()
  @IsBoolean()
  read: boolean;
}
