import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserTokenResponse, UserValidationInterface } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser({ email, password }: UserValidationInterface): Promise<UserEntity> {
    console.log('VALIDATE USER, AUTH SERVICE', email, password);
    const user = await this.userService.getByEmail(email);
    if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await user.validatePassword(password);
    console.log('AUTH SERVICE isPasswordValid', isPasswordValid);
    if (isPasswordValid) return user;
    else throw new HttpException('USER_INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
  }

  async login(user: UserEntity): Promise<{ user: UserEntity; accessToken: string }> {
    // const user = await this.validateUser(payload);
    // console.log('AUTH SERVICE, login', user);
    const accessToken = await this.jwtService.sign({ email: user.email });
    console.log(accessToken, user);
    return {
      user,
      accessToken,
    };
  }
}
