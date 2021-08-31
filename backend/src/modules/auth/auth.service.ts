import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserEntity, UserTokensInterface, UserUpdateTokensDTO, UserValidationDTO } from '../user/entity/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async validateUser({ email, password }: UserValidationDTO): Promise<UserEntity> {
    const user = await this.userService.getByEmail(email);
    if (!user) throw new HttpException('USER_NOT_FOUND', HttpStatus.UNAUTHORIZED);

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) return user;
    else throw new HttpException('USER_INVALID_CREDENTIALS', HttpStatus.UNAUTHORIZED);
  }

  async login(user: UserEntity): Promise<UserTokensInterface> {
    const payload = { id: user.id, email: user.email };
    const accessToken = await this.jwtService.sign(payload);
    console.log('AUTH SERV login t, p', accessToken, user);
    return {
      user,
      accessToken,
      refreshToken: 'TEST',
    };
  }

  async updateTokens({ userID, email, refreshToken }: UserUpdateTokensDTO): Promise<UserTokensInterface> {
    const user = await this.userService.getByID(userID);
    // if (user.hashedRefreshToken !== refreshToken) {
    //   throw new HttpException('USER_EXPIRED_REFRESH', HttpStatus.UNAUTHORIZED);
    // }
    const accessToken = this.jwtService.sign({ id: userID, email });
    console.log('UPDATE TOKENS', accessToken, refreshToken, userID);
    console.log(this.jwtService.verify(accessToken));
    return {
      user,
      accessToken,
      refreshToken: 'TEST',
    };
  }
}
