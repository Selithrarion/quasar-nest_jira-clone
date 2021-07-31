import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO, UpdateBoardDTO } from './dto';
import { ProjectsService } from '../projects/projects.service';
import { ColumnsService } from '../columns/columns.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boards: Repository<BoardEntity>,

    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService,

    @Inject(forwardRef(() => ColumnsService))
    private readonly columnsService: ColumnsService
  ) {}

  async getByID(id: number): Promise<BoardEntity> {
    return await this.boards.findOneOrFail(id, { relations: ['columns'] });
  }

  async create(boardData: CreateBoardDTO): Promise<BoardEntity> {
    const createdBoard = await this.boards.save(boardData);
    await this.columnsService.createDefaultColumns(createdBoard);
    return createdBoard;
  }

  async update(id: number, boardData: UpdateBoardDTO): Promise<BoardEntity> {
    const toUpdate = await this.boards.findOneOrFail(id);
    const updated = { ...toUpdate, ...boardData };
    await this.boards.save(updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.boards.delete(id);
  }
}
