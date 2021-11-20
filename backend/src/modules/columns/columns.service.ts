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

  async create(payload: CreateColumnDTO, userID: number): Promise<ColumnEntity> {
    const board = await this.boardsService.getByID(payload.boardID, userID);
    const createdColumn = await this.columns.save({ ...payload, board });
    return createdColumn;
  }

  async createDefaultColumns(board: BoardEntity): Promise<void> {
    await this.columns.save({ name: 'Backlog', board });
    await this.columns.save({ name: 'Selected for development', board });
    await this.columns.save({ name: 'In work', board });
    await this.columns.save({ name: 'Done', board });
  }

  async update(id: number, payload: UpdateColumnDTO): Promise<ColumnEntity> {
    const toUpdate = await this.columns.findOneOrFail(id);
    const newColumn = { ...toUpdate, ...payload };
    const updated = await this.columns.save(newColumn);
    return updated;
  }
  async delete(id: number): Promise<void> {
    await this.columns.delete(id);
  }
}
