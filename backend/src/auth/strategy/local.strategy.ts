import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity, UserValidationInterface } from '../../user/entity/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email', passwordField: 'password' });
  }

  async validate(email: string, password: string): Promise<UserEntity | UnauthorizedException> {
    console.log('LOCAL STRATEGY', email, password);
    const user = await this.authService.validateUser({ email, password });
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
