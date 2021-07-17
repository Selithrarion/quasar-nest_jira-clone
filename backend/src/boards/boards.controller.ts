import { Body, Controller, Delete, Param, Patch, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BoardsService } from './boards.service';
import { BoardEntity } from './entity/board.entity';
import { CreateBoardDTO, UpdateBoardDTO } from './dto';

@ApiBearerAuth()
@ApiTags('boards')
@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @ApiOperation({ summary: 'Create board' })
  @ApiResponse({ status: 201, description: 'Board was created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async create(@Body() boardData: CreateBoardDTO): Promise<BoardEntity> {
    return await this.boardsService.create(boardData);
  }

  @ApiOperation({ summary: 'Update board' })
  @ApiResponse({ status: 201, description: 'Board was updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() boardData: UpdateBoardDTO): Promise<BoardEntity> {
    return await this.boardsService.update(id, boardData);
  }

  @ApiOperation({ summary: 'Delete board' })
  @ApiResponse({ status: 201, description: 'Board was deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.boardsService.delete(id);
  }
}
