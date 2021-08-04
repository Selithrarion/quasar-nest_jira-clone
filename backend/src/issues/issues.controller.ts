import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateIssueDTO, UpdateIssueDTO } from './dto';
import { IssueEntity } from './entity/issue.entity';

@ApiBearerAuth()
@ApiTags('issues')
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService) {}

  @ApiOperation({ summary: 'Get issue by ID' })
  @ApiResponse({ status: 200, description: 'Return issue' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<IssueEntity> {
    return await this.issuesService.getByID(Number(id));
  }

  @ApiOperation({ summary: 'Create issue' })
  @ApiResponse({ status: 201, description: 'Issue was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() payload: CreateIssueDTO): Promise<IssueEntity> {
    return await this.issuesService.create(payload);
  }

  @ApiOperation({ summary: 'Update issue' })
  @ApiResponse({ status: 200, description: 'Issue was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateIssueDTO): Promise<IssueEntity> {
    return await this.issuesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete issue' })
  @ApiResponse({ status: 204, description: 'Issue was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.issuesService.delete(id);
  }
}
