import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { IssueEntity } from './entity/issue.entity';
import { CreateIssueDTO, UpdateIssueDTO } from './dto';

import { CommentEntity } from './entity/comment.entity';
import { CreateCommentDTO, UpdateCommentDTO } from './dto';

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
  async create(@Body() payload: CreateIssueDTO, @Request() req): Promise<IssueEntity> {
    return await this.issuesService.create(payload, req.user.id);
  }

  @ApiOperation({ summary: 'Update issue' })
  @ApiResponse({ status: 200, description: 'Issue was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateIssueDTO): Promise<IssueEntity> {
    return await this.issuesService.update(Number(id), payload);
  }

  @ApiOperation({ summary: 'Delete issue' })
  @ApiResponse({ status: 204, description: 'Issue was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.issuesService.delete(id);
  }

  @ApiOperation({ summary: 'Add issue comment' })
  @ApiResponse({ status: 201, description: 'Comment was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('comment/:issueID')
  async addComment(
    @Param('issueID') issueID: number,
    @Body() payload: CreateCommentDTO,
    @Request() req
  ): Promise<CommentEntity> {
    return await this.issuesService.addComment(issueID, payload, req.user.id);
  }

  @ApiOperation({ summary: 'Edit issue comment' })
  @ApiResponse({ status: 200, description: 'Comment was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch('comment/:commentID')
  async editComment(@Param('commentID') commentID: number, @Body() payload: UpdateCommentDTO): Promise<CommentEntity> {
    return await this.issuesService.editComment(commentID, payload);
  }

  @ApiOperation({ summary: 'Delete comment' })
  @ApiResponse({ status: 204, description: 'Comment was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete('comment/:commentID')
  async deleteComment(@Param('commentID') commentID: number): Promise<void> {
    return await this.issuesService.deleteComment(commentID);
  }
}
