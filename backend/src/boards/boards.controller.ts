import { Body, Controller, Get, Post, Patch, Delete, Param, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/board.entity';
import { CreateBoardDTO, UpdateBoardDTO } from './dto';

@ApiBearerAuth()
@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Get board' })
  @ApiResponse({ status: 200, description: 'Return board' })
  @Get(':id')
  async getBoardByID(@Param('id') id: number, @Request() req): Promise<BoardEntity> {
    return await this.boardsService.getByID(Number(id), req.user.id);
  }

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 201, description: 'Board was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() boardData: CreateBoardDTO): Promise<BoardEntity> {
    return await this.boardsService.create(boardData);
  }

  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({ status: 200, description: 'Board was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() boardData: UpdateBoardDTO): Promise<BoardEntity> {
    return await this.boardsService.update(id, boardData);
  }

  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 204, description: 'Board was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.boardsService.delete(id);
  }

  @ApiOperation({ summary: 'Toggle board favorite' })
  @ApiResponse({ status: 204, description: 'Board favorite was toggled' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post('favorite/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async toggleFavorite(@Param('id') id: number, @Request() req): Promise<void> {
    return await this.boardsService.toggleFavorite(Number(id), req.user.id);
  }
}
