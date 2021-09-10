import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Nodemailer;

  constructor() {
    this.nodemailerTransport = createTransport({
      host: process.env.EMAIL_SERVICE,
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  sendEmail(options: Nodemailer.Options): Promise<void> {
    return this.nodemailerTransport.sendMail(options);
  }
}
