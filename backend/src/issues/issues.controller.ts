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
  @Get(':id')
  async getByID(@Param('id') id: number): Promise<IssueEntity> {
    return await this.issuesService.getByID(id);
  }

  @ApiOperation({ summary: 'Create issue' })
  @ApiResponse({ status: 201, description: 'Issue was created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async create(@Body() payload: CreateIssueDTO): Promise<IssueEntity> {
    return await this.issuesService.create(payload);
  }

  @ApiOperation({ summary: 'Update issue' })
  @ApiResponse({ status: 201, description: 'Issue was updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateIssueDTO): Promise<IssueEntity> {
    return await this.issuesService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete issue' })
  @ApiResponse({ status: 201, description: 'Issue was deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.issuesService.delete(id);
  }
}
