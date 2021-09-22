import { Module } from '@nestjs/common';
import { TwoFactorAuthController } from './two-factor-auth.controller';
import { TwoFactorAuthService } from './two-factor-auth.service';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
  imports: [AuthModule, UserModule],
  controllers: [TwoFactorAuthController],
  providers: [TwoFactorAuthService],
})
export class TwoFactorAuthModule {}
