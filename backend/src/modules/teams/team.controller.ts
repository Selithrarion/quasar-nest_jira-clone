import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TeamEntity } from './entity/team.entity';
import { TeamService } from './team.service';
import { CreateTeamDTO } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicFileEntity } from '../files/entity/public-file.entity';
import { UserEntity } from '../user/entity/user.entity';

@ApiBearerAuth()
@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<TeamEntity> {
    return await this.teamService.getByID(id);
  }

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 201, description: 'Team was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() payload: CreateTeamDTO, @Request() req): Promise<TeamEntity> {
    return await this.teamService.create(payload, req.user.id);
  }

  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({ status: 200, description: 'Team was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: Partial<TeamEntity>): Promise<TeamEntity> {
    return await this.teamService.update(id, payload);
  }

  @ApiOperation({ summary: 'Add users to team' })
  @ApiResponse({ status: 200, description: 'Team users were updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch('add-users/:id')
  async addUsers(@Param('id') id: number, @Body('users') users: UserEntity[]): Promise<TeamEntity> {
    return await this.teamService.addUsers(id, users);
  }

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Team was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.teamService.delete(id);
  }

  @ApiBearerAuth()
  @Post('avatar/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Param('id') id: number): Promise<PublicFileEntity> {
    return await this.teamService.setTeamImage(file, 'avatar', id);
  }

  @ApiBearerAuth()
  @Post('header/:id')
  @UseInterceptors(FileInterceptor('file'))
  async uploadHeader(@UploadedFile() file: Express.Multer.File, @Param('id') id: number): Promise<PublicFileEntity> {
    return await this.teamService.setTeamImage(file, 'header', id);
  }
  @ApiBearerAuth()
  @Delete('header/:id')
  async deleteHeader(@Param('id') id: number): Promise<void> {
    return await this.teamService.deleteTeamImage('header', id);
  }

  @Get('is-taken')
  async isTeamNameTaken(@Query('name') name: string): Promise<boolean> {
    return await this.teamService.isTeamNameTaken(name);
  }
}
