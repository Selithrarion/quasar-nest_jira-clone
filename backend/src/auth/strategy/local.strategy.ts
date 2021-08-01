import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity, UserValidationInterface } from '../../user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(payload: UserValidationInterface): Promise<UserEntity | UnauthorizedException> {
    console.log('LOCAL STRATEGY', payload)
    const user = await this.authService.validateUser(payload);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
