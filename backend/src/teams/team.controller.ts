import { Body, Controller, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { TeamEntity } from './entity/team.entity';
import { teamRepository } from './team.service';
import { CreateTeamDTO } from './dto';

@ApiBearerAuth()
@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamRepository: teamRepository) {}

  @Get(':id')
  async getByID(@Param('id') id: number): Promise<TeamEntity> {
    return await this.teamRepository.getByID(id);
  }

  @ApiOperation({ summary: 'Create team' })
  @ApiResponse({ status: 201, description: 'Team was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() payload: CreateTeamDTO, @Request() req): Promise<TeamEntity> {
    return await this.teamRepository.create(payload, req.user.id);
  }

  @ApiOperation({ summary: 'Update team' })
  @ApiResponse({ status: 200, description: 'Team was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: Partial<TeamEntity>): Promise<TeamEntity> {
    return await this.teamRepository.update(id, payload);
  }

  @Get('is-taken')
  async isTeamNameTaken(@Query('name') name: string): Promise<boolean> {
    return await this.teamRepository.isTeamNameTaken(name);
  }
}
