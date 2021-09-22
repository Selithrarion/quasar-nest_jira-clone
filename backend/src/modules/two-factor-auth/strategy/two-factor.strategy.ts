import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserJwtPayload } from '../../user/entity/user.entity';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtTwoFactorStrategy extends PassportStrategy(Strategy, 'two-factor') {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserJwtPayload): Promise<UserJwtPayload> {
    const user = await this.userService.getByID(payload.id);
    const isUser2FADisabled = !user.isTwoFactorEnabled;

    if (isUser2FADisabled) return payload;
    if (payload.is2FAEnabled) return payload;
  }
}
