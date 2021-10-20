import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import * as bcrypt from 'bcrypt';

import {
  UserEntity,
  UserGoogleData,
  UserJwtPayload,
  UserTokensInterface,
  UserUpdateTokensDTO,
  UserValidationDTO,
} from '../user/entity/user.entity';
import { CreateUserDTO } from '../user/dto';

import { google, Auth } from 'googleapis';
import { EmailVerificationService } from '../email-verification/email-verification.service';
import { CreateUserGithubDTO } from '../user/dto/create-user-github.dto';

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

  async login(user: UserEntity, is2FAEnabled = false): Promise<UserTokensInterface> {
    if (user.isTwoFactorEnabled && !is2FAEnabled) return null;

    const payload: UserJwtPayload = { id: user.id, email: user.email, is2FAEnabled };
    console.log('AUTH SERVICE login', payload);

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
    await this.userService.setRefreshToken(user.id, refreshToken);

    return {
      user,
      accessToken,
      refreshToken,
    };
  }
  async register(payload: CreateUserDTO): Promise<UserEntity> {
    const user = await this.userService.create(payload);
    await this.emailVerificationService.sendVerificationLink(payload.email);
    return user;
  }

  async updateTokens({ userID, email, refreshToken }: UserUpdateTokensDTO): Promise<UserTokensInterface> {
    const user = await this.userService.getByID(userID);
    if (user.hashedRefreshToken !== (await bcrypt.hash(refreshToken, 10))) {
      throw new HttpException('USER_EXPIRED_REFRESH', HttpStatus.UNAUTHORIZED);
    }

    const accessToken = this.jwtService.sign({ id: userID, email });
    const newRefreshToken = this.jwtService.sign(
      { id: userID, email },
      {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
      }
    );
    await this.userService.setRefreshToken(userID, newRefreshToken);

    console.log('UPDATE TOKENS', accessToken, refreshToken, newRefreshToken, userID);
    console.log(this.jwtService.verify(accessToken));

    return {
      user,
      accessToken,
      refreshToken,
    };
  }

  async authWithGoogle(token: string): Promise<UserTokensInterface> {
    const { email } = await this.oauthClient.getTokenInfo(token);
    const user = await this.userService.getByEmail(email);

    if (user && user.isGoogleAccount) return this.login(user);
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

  async authWithGithub(code: string): Promise<UserTokensInterface> {
    const authorizeURL = 'https://github.com/login/oauth/access_token';
    const authorizeParams = {
      client_id: process.env.GITHUB_AUTH_CLIENT_ID,
      client_secret: process.env.GITHUB_AUTH_CLIENT_SECRET,
      code,
    };
    const authorizeConfig = {
      headers: {
        accept: 'application/json',
      },
    };
    const { data: authData } = await axios.post(authorizeURL, authorizeParams, authorizeConfig);

    const getUserURL = 'https://api.github.com/user';
    const getUserEmailsURL = 'https://api.github.com/user/emails';
    const getUserConfig = {
      headers: {
        Authorization: `Bearer ${authData.access_token}`,
      },
    };

    const { data: githubUser } = await axios.get(getUserURL, getUserConfig);

    const { data: userEmails } = await axios.get(getUserEmailsURL, getUserConfig);
    const primaryEmail = userEmails.find((item) => item.primary)?.email;

    const user = await this.userService.getByEmail(primaryEmail);
    if (user && user.isGithubAccount) return this.login(user);
    else {
      // TODO: add avatar
      const payload = {
        name: githubUser.name,
        username: githubUser.login,
        email: primaryEmail,
        location: githubUser.location,
        company: githubUser.company,
      };
      return this.registerWithGithub(payload);
    }
  }

  async registerWithGithub(payload: CreateUserGithubDTO): Promise<UserTokensInterface> {
    const user = await this.userService.createWithGithub(payload);
    return this.login(user);
  }
}
