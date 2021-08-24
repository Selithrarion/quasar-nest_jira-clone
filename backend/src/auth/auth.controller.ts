import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { UserTokensInterface, UserUpdateTokensDTO } from '../user/entity/user.entity';
import { Public } from './decorators/public.decorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Public()
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req): Promise<UserTokensInterface> {
    console.log('AUTH CONTROLLER LOGIN', req.user);
    return await this.authService.login(req.user);
  }

  @Post('register')
  async register(@Body() payload: CreateUserDTO): Promise<UserTokensInterface> {
    console.log('REGISTER', payload);
    const user = await this.userRepository.create(payload);
    return await this.authService.login(user);
  }

  @Post('update-tokens')
  async updateTokens(@Body() payload: UserUpdateTokensDTO): Promise<UserTokensInterface> {
    return await this.authService.updateTokens(payload);
  }
}
