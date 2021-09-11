import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../services/email/email.service';

@Injectable()
export class EmailVerificationService {
  constructor(private readonly jwtService: JwtService, private readonly emailService: EmailService) {}

  sendVerificationLink(email: string): Promise<void> {
    const token = this.jwtService.sign({ email });

    const isLocalhost = process.env.SERVER_URL === 'localhost';
    const localHostURL = `${process.env.SERVER_URL}:${process.env.PORT}`;
    const url = isLocalhost ? `${localHostURL}?token=${token}` : `${process.env.SERVER_URL}?token=${token}`;

    const subject = 'Jira email confirmation';
    const text = `Welcome to Jira (clone). To confirm the email address, click here: ${url}`;

    return this.emailService.sendEmail({
      to: email,
      subject,
      text,
    });
  }
}
