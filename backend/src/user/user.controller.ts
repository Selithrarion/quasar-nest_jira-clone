import { Controller, Get, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

import { Public } from '../auth/decorators/public.decorator';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get('self')
  async getSelf(@Request() req): Promise<UserEntity> {
    return await this.userService.getByID(req.user.id);
  }

  @Public()
  @Get('is-taken')
  async isUsernameTaken(@Query('username') username: string): Promise<boolean> {
    return await this.userService.isUsernameTaken(username);
  }
}
