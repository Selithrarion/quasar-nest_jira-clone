import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { ProjectEntity } from './entity/project.entity';
import { ProjectsService } from './projects.service';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate/index';

import { IssueEntity } from '../issues/entity/issue.entity';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects' })
  @Get()
  async getAll(@Query() query: IPaginationOptions, @Request() req): Promise<Pagination<ProjectEntity>> {
    return await this.projectsService.getAll(query, req.user.id);
  }

  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Return project' })
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectsService.getByID(id);
  }

  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 201, description: 'Project was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() projectData: CreateProjectDTO, @Request() req): Promise<ProjectEntity> {
    return await this.projectsService.create(projectData, req.user.id);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 200, description: 'Project was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    return await this.projectsService.update(Number(id), projectData);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 204, description: 'Project was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectsService.delete(id);
  }

  @ApiOperation({ summary: 'Toggle project favorite' })
  @ApiResponse({ status: 204, description: 'Project favorite was toggled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('favorite/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async toggleFavorite(@Param('id') id: number, @Request() req): Promise<void> {
    return await this.projectsService.toggleFavorite(Number(id), req.user.id);
  }

  @ApiOperation({ summary: 'Get issues by project ID' })
  @ApiResponse({ status: 200, description: 'Return project issues' })
  @Get(':id/issues')
  async getIssuesByProjectID(@Param('id') id: number): Promise<IssueEntity[]> {
    return await this.projectsService.getIssuesByProjectID(id);
  }
}
