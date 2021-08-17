import { Body, Controller, Get, Param, Patch, Query, Request } from '@nestjs/common';
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

  @ApiBearerAuth()
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getByID(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userService.update(id, payload);
  }

  @Public()
  @Get('is-taken')
  async isUsernameTaken(@Query('username') username: string): Promise<boolean> {
    return await this.userService.isUsernameTaken(username);
  }
}
