import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';
import { JwtModule } from '@nestjs/jwt';
import { EmailModule } from '../../services/email/email.module';

@Module({
  imports: [
    EmailModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_EMAIL_VERIFICATION_SECRET,
        signOptions: { expiresIn: process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN },
      }),
    }),
  ],
  providers: [EmailVerificationService],
  controllers: [EmailVerificationController],
})
export class EmailVerificationModule {}
