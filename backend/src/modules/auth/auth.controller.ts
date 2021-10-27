import { Controller, Post, Body, UseGuards, Request, Get, HttpCode } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserTokensInterface, UserUpdateTokensDTO } from '../user/entity/user.entity';

import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(200)
  @Post('login')
  async login(@Request() req): Promise<UserTokensInterface> {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDTO): Promise<UserTokensInterface> {
    const user = await this.authService.register(payload);
    return await this.authService.login(user);
  }

  @Post('update-tokens')
  async updateTokens(@Body() payload: UserUpdateTokensDTO): Promise<UserTokensInterface> {
    return await this.authService.updateTokens(payload);
  }

  @HttpCode(200)
  @Post('google-auth')
  async authWithGoogle(@Body('token') token: string): Promise<UserTokensInterface> {
    return await this.authService.authWithGoogle(token);
  }
  @HttpCode(200)
  @Post('github-auth')
  async authWithGithub(@Body('code') code: string): Promise<UserTokensInterface> {
    return await this.authService.authWithGithub(code);
  }
}
