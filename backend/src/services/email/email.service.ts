import { Injectable } from '@nestjs/common';
import * as Nodemailer from 'nodemailer/lib/mailer';
import { createTransport } from 'nodemailer';

@Injectable()
export class EmailService {
  private readonly nodemailerTransport: Nodemailer;

  constructor() {
    this.nodemailerTransport = createTransport({
      service: 'gmail',
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
