import { IsDateString, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class EmailScheduleDTO {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString()
  date: string;
}
