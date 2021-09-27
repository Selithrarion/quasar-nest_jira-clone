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

  @ApiOperation({ summary: 'Delete team' })
  @ApiResponse({ status: 200, description: 'Team was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.teamService.delete(id);
  }

  @ApiBearerAuth()
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.teamService.setTeamImage(file, 'avatar', req.user.id);
  }

  @ApiBearerAuth()
  @Post('header')
  @UseInterceptors(FileInterceptor('file'))
  async uploadHeader(@UploadedFile() file: Express.Multer.File, @Request() req): Promise<PublicFileEntity> {
    return await this.teamService.setTeamImage(file, 'header', req.user.id);
  }
  @ApiBearerAuth()
  @Delete('header')
  async deleteHeader(@Request() req): Promise<void> {
    return await this.teamService.deleteTeamImage('header', req.user.id);
  }

  @Get('is-taken')
  async isTeamNameTaken(@Query('name') name: string): Promise<boolean> {
    return await this.teamService.isTeamNameTaken(name);
  }
}
