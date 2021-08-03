import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { UserTokenResponse, UserValidationInterface } from '../user/entity/user.entity';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<UserTokenResponse> {
    console.log('AUTH CONTROLLER LOGIN', req.user);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDTO): Promise<UserTokenResponse> {
    console.log('REGISTER', payload);
    const user = await this.userService.create(payload);
    return await this.authService.login(user);
  }
}
