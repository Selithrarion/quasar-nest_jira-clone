import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../../services/email/email.service';
import { UserService } from '../user/user.service';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
    private readonly userService: UserService
  ) {}

  sendVerificationLink(email: string): Promise<void> {
    const token = this.jwtService.sign({ email });

    const url = `${process.env.FRONTEND_URL}?token=${token}`;
    const subject = 'Jira email confirmation';
    const text = `Welcome to Jira (clone). To confirm the email address, click here: ${url}`;

    return this.emailService.sendEmail({
      to: email,
      subject,
      text,
    });
  }

  async confirmToken(token: string): Promise<string> {
    try {
      const payload = await this.jwtService.verify(token);
      if (payload.email) return payload.email;
    } catch (e) {
      const isExpiredError = e.name === 'TokenExpiredError';
      if (isExpiredError) throw new BadRequestException('EMAIL_CONFIRMATION_TOKEN_EXPIRED');
      throw new BadRequestException('EMAIL_CONFIRMATION_TOKEN_INCORRECT');
    }
  }
  async confirmEmail(email: string): Promise<boolean> {
    const user = await this.userService.getByEmail(email);
    if (user.isEmailConfirmed) throw new BadRequestException('EMAIL_ALREADY_CONFIRMED');
    return await this.userService.confirmUserEmail(email);
  }

  // TODO: need to invalidate previous token (store previous token in database and compare)
  async resend(userID: number): Promise<void> {
    const user = await this.userService.getByID(userID);
    if (user.isEmailConfirmed) throw new BadRequestException('EMAIL_ALREADY_CONFIRMED');
    return await this.sendVerificationLink(user.email);
  }
}
