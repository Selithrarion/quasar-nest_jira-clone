import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { UserTokenResponse, UserValidationInterface } from '../user/entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() payload: UserValidationInterface): Promise<UserTokenResponse> {
    console.log('AUTH CONTROLLER LOGIN', payload);
    return await this.authService.login(payload);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDTO): Promise<UserTokenResponse> {
    console.log('REGISTER', payload);
    await this.userService.create(payload);
    return await this.authService.login({ email: payload.email, password: payload.password });
  }
}
