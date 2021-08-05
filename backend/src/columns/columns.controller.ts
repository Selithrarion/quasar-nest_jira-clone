import { Controller, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { CreateColumnDTO, UpdateColumnDTO } from './dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnEntity } from './entity/column.entity';


@ApiBearerAuth()
@ApiTags('columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnsService: ColumnsService) {}

  @ApiOperation({ summary: 'Create column' })
  @ApiResponse({ status: 201, description: 'Column was created' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Post()
  async create(@Body() payload: CreateColumnDTO, @Request() req): Promise<ColumnEntity> {
    return await this.columnsService.create(payload, req.user.id);
  }

  @ApiOperation({ summary: 'Update column' })
  @ApiResponse({ status: 200, description: 'Column was updated' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Patch(':id')
  async update(@Param('id') id: number, @Body() payload: UpdateColumnDTO): Promise<ColumnEntity> {
    return await this.columnsService.update(Number(id), payload);
  }

  @ApiOperation({ summary: 'Delete column' })
  @ApiResponse({ status: 204, description: 'Column was deleted' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return await this.columnsService.delete(id);
  }
}
