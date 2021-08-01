import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { UserEntity } from './entity/user.entity';

@Controller('user')
export class UserController {
  @UseGuards(JwtAuthGuard)
  @Get('self')
  getSelf(@Request() req): UserEntity {
    return req.user;
  }
}
