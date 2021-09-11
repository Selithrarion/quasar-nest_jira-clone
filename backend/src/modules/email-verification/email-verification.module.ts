import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { EmailVerificationService } from './email-verification.service';
import { EmailVerificationController } from './email-verification.controller';

import { EmailModule } from '../../services/email/email.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    EmailModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: process.env.JWT_EMAIL_VERIFICATION_SECRET,
        signOptions: { expiresIn: process.env.JWT_EMAIL_VERIFICATION_EXPIRES_IN },
      }),
    }),
  ],
  exports: [EmailVerificationService],
  providers: [EmailVerificationService],
  controllers: [EmailVerificationController],
})
export class EmailVerificationModule {}
