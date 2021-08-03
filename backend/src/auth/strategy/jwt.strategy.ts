import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserEntity, UserValidationInterface } from '../../user/entity/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserValidationInterface): Promise<string> {
    console.log(payload);
    return payload.email;
    // console.log('JWT STRATEGY', payload);
    // const user = await this.authService.validateUser(payload);
    // console.log('JWT STRATEGY USER', user);
    // if (user) return user;
    // else throw new HttpException('INVALID CREDENTIALS', HttpStatus.UNAUTHORIZED);
  }
}
