import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO, UpdateBoardDTO } from './dto';
import { ColumnsService } from '../columns/columns.service';
import { UserService } from '../user/user.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boards: Repository<BoardEntity>,

    @Inject(forwardRef(() => ColumnsService))
    private readonly columnsService: ColumnsService,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getByID(boardID: number, userID: number): Promise<BoardEntity> {
    const currentUser = await this.userService.getByID(userID);
    const board = await this.boards.findOneOrFail(boardID, {
      relations: ['columns'],
    });
    const sortedColumns = board.columns.sort((a, b) => a.id - b.id);
    return { ...board, columns: sortedColumns, favorite: currentUser.favoriteBoardIDs.includes(boardID) };
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

  async toggleFavorite(boardID: number, userID: number): Promise<void> {
    const userFavoriteBoards = await this.userService.getFavoriteBoards(userID);
    const boardIndex = userFavoriteBoards.findIndex((b) => b.id === boardID);

    if (boardIndex !== -1) {
      userFavoriteBoards.splice(boardIndex, 1);
    } else {
      const project = await this.boards.findOneOrFail(boardID);
      userFavoriteBoards.push(project);
    }

    await this.userService.update(userID, { favoriteBoards: userFavoriteBoards });
  }
}
