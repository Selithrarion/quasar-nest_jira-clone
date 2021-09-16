import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

import {
  UserEntity,
  UserGoogleData,
  UserTokensInterface,
  UserUpdateTokensDTO,
  UserValidationDTO,
} from '../user/entity/user.entity';
import { CreateUserDTO } from '../user/dto';

import { google, Auth } from 'googleapis';
import { EmailVerificationService } from '../email-verification/email-verification.service';

@Injectable()
export class AuthService {
  oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly userService: UserService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly jwtService: JwtService
  ) {
    const googleClientID = process.env.GOOGLE_AUTH_CLIENT_ID;
    const googleClientSecret = process.env.GOOGLE_AUTH_CLIENT_SECRET;

    this.oauthClient = new google.auth.OAuth2(googleClientID, googleClientSecret);
  }

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
    //   await this.userService.setRefreshToken(refreshToken, userID);
    return {
      user,
      accessToken,
      refreshToken: 'TEST',
    };
  }
  async register(payload: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userService.create(payload);
    await this.emailVerificationService.sendVerificationLink(payload.email);
    return user;
  }

  async updateTokens({ userID, email, refreshToken }: UserUpdateTokensDTO): Promise<UserTokensInterface> {
    const user = await this.userService.getByID(userID);
    // if (user.hashedRefreshToken !== refreshToken) {
    //   throw new HttpException('USER_EXPIRED_REFRESH', HttpStatus.UNAUTHORIZED);
    // }
    const accessToken = this.jwtService.sign({ id: userID, email });
    console.log('UPDATE TOKENS', accessToken, refreshToken, userID);
    console.log(this.jwtService.verify(accessToken));
    //   await this.userService.setRefreshToken(refreshToken, userID);
    return {
      user,
      accessToken,
      refreshToken: 'TEST',
    };
  }

  async authWithGoogle(token: string): Promise<UserTokensInterface> {
    const { email } = await this.oauthClient.getTokenInfo(token);
    const user = await this.userService.getByEmail(email);

    if (user) return this.login(user);
    return this.registerWithGoogle(token, email);
  }

  async registerWithGoogle(token: string, email: string): Promise<UserTokensInterface> {
    const { picture } = await this.getGoogleUserData(token);
    const user = await this.userService.createWithGoogle(email);
    return this.login(user);
  }

  async getGoogleUserData(token: string): Promise<UserGoogleData> {
    const userClient = google.oauth2('v2').userinfo;
    this.oauthClient.setCredentials({
      access_token: token,
    });

    const { data } = await userClient.get({
      auth: this.oauthClient,
    });

    // TODO: need to get google username and name
    return {
      email: data.email,
      picture: data.picture,
    };
  }
}
