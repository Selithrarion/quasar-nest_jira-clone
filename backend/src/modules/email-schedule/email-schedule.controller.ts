import { Body, Controller, Post } from '@nestjs/common';
import { EmailScheduleService } from './email-schedule.service';
import { EmailScheduleDTO } from './dto/email-schedule.dto';

@Controller('email-schedule')
export class EmailScheduleController {
  constructor(private readonly emailScheduleService: EmailScheduleService) {}

  @Post()
  scheduleEmail(@Body() emailSchedule: EmailScheduleDTO): Promise<void> {
    return this.emailScheduleService.scheduleEmail(emailSchedule);
  }
}
