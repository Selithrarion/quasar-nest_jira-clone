import { Inject, Injectable } from '@nestjs/common';
import { UserEntity, UserOTP } from '../user/entity/user.entity';
import { UserService } from '../user/user.service';

import { Response } from 'express';
import { authenticator } from 'otplib';
import { toFileStream } from 'qrcode';

@Injectable()
export class TwoFactorAuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async generateSecret(userID: number): Promise<UserOTP> {
    const user = await this.userService.getByID(userID);

    const secret = authenticator.generateSecret();
    const otpURL = authenticator.keyuri(user.email, process.env.TWO_FACTOR_AUTH_APP_NAME, secret);

    await this.userService.set2FaSecret(user.id, secret);

    return {
      secret,
      otpURL,
    };
  }

  async pipeQrCodeStream(stream: Response, otpURL: string): Promise<void> {
    return toFileStream(stream, otpURL);
  }
}
