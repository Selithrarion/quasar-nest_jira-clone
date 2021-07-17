import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
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
  async getAll(@Query() query): Promise<ProjectEntity[]> {
    return await this.projectsService.getAll(query);
  }

  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Return project' })
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<ProjectEntity> {
    return await this.projectsService.getByID(id);
  }

  @ApiOperation({ summary: 'Create project' })
  @ApiResponse({ status: 201, description: 'Project was created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async create(@Body() projectData: CreateProjectDTO): Promise<ProjectEntity> {
    return await this.projectsService.create(projectData);
  }

  @ApiOperation({ summary: 'Update project' })
  @ApiResponse({ status: 201, description: 'Project was updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    return await this.projectsService.update(id, projectData);
  }

  @ApiOperation({ summary: 'Delete project' })
  @ApiResponse({ status: 201, description: 'Project was deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.projectsService.delete(id);
  }

  @ApiOperation({ summary: 'Toggle project favorite' })
  @ApiResponse({ status: 200, description: 'Project favorite was toggled' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post('favorite/:id')
  async toggleFavorite(@Param('id') id: number): Promise<void> {
    return await this.projectsService.toggleFavorite(id);
  }
}
