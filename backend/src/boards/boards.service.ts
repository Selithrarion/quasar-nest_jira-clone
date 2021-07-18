import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardEntity } from './entity/board.entity';
import { Repository } from 'typeorm';
import { CreateBoardDTO, UpdateBoardDTO } from './dto';
import { ProjectsService } from '../projects/projects.service';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boards: Repository<BoardEntity>,

    @Inject(forwardRef(() => ProjectsService))
    private readonly projectsService: ProjectsService
  ) {}

  async create(boardData: CreateBoardDTO): Promise<BoardEntity> {
    const createdBoard = await this.boards.save(boardData);
    const project = await this.projectsService.getByID(createdBoard.projectID);
    const updatedProject = { ...project, boards: [...project.boards, createdBoard] };
    await this.projectsService.update(updatedProject.id, updatedProject);
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
