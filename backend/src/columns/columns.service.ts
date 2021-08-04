import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateColumnDTO, UpdateColumnDTO } from './dto';
import { ColumnEntity } from './entity/column.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardsService } from '../boards/boards.service';
import { BoardEntity } from '../boards/entity/board.entity';

@Injectable()
export class ColumnsService {
  constructor(
    @InjectRepository(ColumnEntity)
    private readonly columns: Repository<ColumnEntity>,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService
  ) {}

  async create(columnData: CreateColumnDTO, userID: number): Promise<ColumnEntity> {
    const board = await this.boardsService.getByID(columnData.boardID, userID);
    const createdColumn = await this.columns.save({ ...columnData, board });
    return createdColumn;
  }

  async createDefaultColumns(board: BoardEntity): Promise<void> {
    await this.columns.save({ name: 'Бэклог', board });
    await this.columns.save({ name: 'Выбрано для разработки', board });
    await this.columns.save({ name: 'В работе', board });
    await this.columns.save({ name: 'Готово', board });
  }

  async update(id: number, columnData: UpdateColumnDTO): Promise<ColumnEntity> {
    const toUpdate = await this.columns.findOneOrFail(id);
    const updated = { ...toUpdate, ...columnData };
    await this.columns.save(updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.columns.delete(id);
  }
}
