import { Body, Controller, Post, Request } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { Public } from '../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('email-verification')
@Controller('email-verification')
export class EmailVerificationController {
  constructor(private readonly emailVerificationService: EmailVerificationService) {}

  @ApiOperation({ summary: 'Confirm email with token' })
  @ApiResponse({ status: 200, description: 'Email was confirmed' })
  @ApiResponse({ status: 400, description: 'Token is expired or incorrect' })
  @Public()
  @Post()
  async confirm(@Body('token') token: string): Promise<boolean> {
    const email = await this.emailVerificationService.confirmToken(token);
    return await this.emailVerificationService.confirmEmail(email);
  }

  @ApiOperation({ summary: 'Resend confirmation email' })
  @ApiResponse({ status: 200, description: 'Confirmation email was resend' })
  @Public()
  @Post('resend')
  resend(@Request() req): Promise<void> {
    return this.emailVerificationService.resend(req.user.id);
  }
}
