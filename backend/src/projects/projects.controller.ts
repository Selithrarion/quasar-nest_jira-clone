import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectEntity } from './entity/project.entity';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { ProjectsService } from './projects.service';

@ApiBearerAuth()
@ApiTags('projects')
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Return all projects' })
  @Get()
  async getAll(@Query() query, @Request() req): Promise<ProjectEntity[]> {
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
  @ApiResponse({ status: 201, description: 'Project was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    return await this.projectsService.update(id, projectData);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 201, description: 'Project was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectsService.delete(id);
  }

  @ApiOperation({ summary: 'Toggle project favorite' })
  @ApiResponse({ status: 200, description: 'Project favorite was toggled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('favorite/:id')
  async toggleFavorite(@Param('id') id: number, @Request() req): Promise<void> {
    return await this.projectsService.toggleFavorite(Number(id), req.user.id);
  }
}
