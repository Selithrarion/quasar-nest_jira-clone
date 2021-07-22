import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO, UpdateColumnDTO } from './dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ColumnEntity } from './entity/column.entity';

@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, description: 'Column was created' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Post()
  async create(@Body() columnData: CreateColumnDTO): Promise<ColumnEntity> {
    return await this.columnsService.create(columnData);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 201, description: 'Column was updated' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() columnData: UpdateColumnDTO): Promise<ColumnEntity> {
    return await this.columnsService.update(id, columnData);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 201, description: 'Column was deleted' })
  @ApiResponse({ status: 403, description: 'Forbidden' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.columnsService.delete(id);
  }
}
