import { Injectable } from '@nestjs/common';
import { SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

import { EmailScheduleDTO } from './dto/email-schedule.dto';
import { EmailService } from '../../services/email/email.service';

@Injectable()
export class EmailScheduleService {
  constructor(private readonly emailService: EmailService, private readonly schedulerRegistry: SchedulerRegistry) {}

  async scheduleEmail(schedule: EmailScheduleDTO): Promise<void> {
    const date = new Date(schedule.date);
    const job = await new CronJob(date, () => {
      this.emailService.sendEmail({
        to: schedule.email,
        subject: schedule.subject,
        text: schedule.content,
      });
    });

    this.schedulerRegistry.addCronJob(`${Date.now()}-${schedule.subject}`, job);
    job.start();
  }

  cancelAllScheduledEmails(): void {
    this.schedulerRegistry.getCronJobs().forEach((job) => {
      job.stop();
    });
  }
}
