import { Inject, Injectable } from '@nestjs/common';
import { UserEntity, UserOTP } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

import { authenticator } from 'otplib';
import { toDataURL } from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async generateSecret(user: UserEntity): Promise<UserOTP> {
    const secret = authenticator.generateSecret();
    const otpURL = authenticator.keyuri(user.email, process.env.TWO_FACTOR_AUTH_APP_NAME, secret);

    await this.userService.set2FaSecret(user.id, secret);

    return {
      secret,
      otpURL,
    };
  }
  async getQrCodeURL(otpURL: string): Promise<string> {
    return toDataURL(otpURL);
  }

  async isValid(code: string, user: UserEntity): Promise<boolean> {
    return authenticator.verify({
      token: code,
      secret: user.twoFactorSecret,
    });
  }
}
