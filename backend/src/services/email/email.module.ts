import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';

@Module({
  imports: [],
  exports: [EmailService],
  controllers: [EmailController],
  providers: [EmailService],
})
export class EmailModule {}
