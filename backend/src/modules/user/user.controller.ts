import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { UserEntity } from './entity/user.entity';
import { UserService } from './user.service';

import { Public } from '../auth/decorators/public.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFileEntity } from '../files/entity/public-file.entity';
import { TeamEntity } from '../teams/entity/team.entity';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiBearerAuth()
  @Get()
  async get(@Query('search') search: string, @Request() req): Promise<UserEntity[]> {
    return await this.userService.get(search, req.user.id);
  }

  @ApiBearerAuth()
  @Get('self')
  async getSelf(@Request() req): Promise<UserEntity> {
    return await this.userService.getByID(req.user.id);
  }
  @ApiBearerAuth()
  @Get('teams')
  async getCurrentUserTeams(@Request() req): Promise<TeamEntity[]> {
    const user = await this.userService.getProfileByID(req.user.id);
    return user.teams;
  }

  @Public()
  @Get('is-username-taken')
  async isUsernameTaken(@Query('username') username: string): Promise<boolean> {
    return await this.userService.isUsernameTaken(username);
  }
  @Public()
  @Get('is-email-taken')
  async isEmailTaken(@Query('email') email: string): Promise<boolean> {
    return await this.userService.isEmailTaken(email);
  }

  @ApiBearerAuth()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.userService.setUserImage(file, 'avatar', req.user.id);
  }

  @ApiBearerAuth()
  @Post('header')
  @UseInterceptors(FileInterceptor('file'))
  async uploadHeader(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.userService.setUserImage(file, 'header', req.user.id);
  }
  @ApiBearerAuth()
  @Delete('header')
  async deleteHeader(@Request() req): Promise<void> {
    return await this.userService.deleteUserImage('header', req.user.id);
  }

  @ApiBearerAuth()
  @Get(':id')
  async getProfileByID(@Param('id') id: number): Promise<UserEntity> {
    return await this.userService.getProfileByID(id);
  }
  @ApiBearerAuth()
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: Partial<UserEntity>): Promise<UserEntity> {
    return await this.userService.update(id, payload);
  }
}
