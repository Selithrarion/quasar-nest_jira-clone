import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO } from './dto/create-board.dto';
import { UpdateBoardDTO } from './dto/update-board.dto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boards: Repository<BoardEntity>
  ) {}

  async create(boardData: CreateBoardDTO): Promise<BoardEntity> {
    const createdBoard = await this.boards.save(boardData);
    return createdBoard;
  }

  async update(id: number, boardData: UpdateBoardDTO): Promise<BoardEntity> {
    const toUpdate = await this.boards.findOneOrFail(id);
    const updated = { ...toUpdate, ...boardData };
    await this.boards.save(updated);
    console.log('update board', updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.boards.delete(id);
  }
}
