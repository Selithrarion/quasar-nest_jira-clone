import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { UserEntity } from '../user/entity/user.entity';
import { BoardsService } from '../boards/boards.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projects: Repository<ProjectEntity>,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService
  ) {}

  private mockUser: UserEntity = {
    id: 1,
    name: 'Mock',
    password: 'password',
    email: 'mock@yande.xru',
    locale: 'ru',
    isActive: true,
    avatarURL: null,
    assignedIssues: [],
    favoriteProjectsIDs: [1, 7, 8, 12, 15],
  };

  async getAll(query): Promise<ProjectEntity[]> {
    const allProjects = await this.projects.find();
    const formattedProjects = allProjects.map((p) => ({
      ...p,
      favorite: this.mockUser.favoriteProjectsIDs.includes(p.id),
    }));
    return formattedProjects;
  }

  async getByID(id: number): Promise<ProjectEntity> {
    return await this.projects.findOneOrFail(id);
  }

  async create(projectData: CreateProjectDTO): Promise<ProjectEntity> {
    const leader = this.mockUser;
    const defaultColumns = [
      {
        id: 1,
        name: 'Бэклог',
        boardID: 1,
        issues: [],
      },
      {
        id: 2,
        name: 'Выбрано для разработки',
        boardID: 1,
        issues: [],
      },
      {
        id: 3,
        name: 'В работе',
        boardID: 1,
        issues: [],
      },
      {
        id: 4,
        name: 'Готово',
        boardID: 1,
        issues: [],
      },
    ];
    const createdProject = await this.projects.create({ ...projectData, leader });

    const defaultBoard = {
      name: projectData.key + projectData.name,
      favorite: false,
      columns: defaultColumns,
      projectID: createdProject.id,
    };
    const createdBoard = await this.boardsService.create(defaultBoard);

    createdProject.boards = [createdBoard];
    await this.projects.save(createdProject);
    return createdProject;
  }

  async update(id: number, projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    const toUpdate = await this.projects.findOneOrFail({ id });
    const updated = { ...toUpdate, ...projectData };
    await this.projects.save(updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.projects.delete(id);
  }

  async toggleFavorite(id: number): Promise<void> {
    // const user = this.mockUser
    // const filteredFavorites = user.favoriteProjectsIDs.filter(p => p.id !== id)
    // await this.users.update(id);
  }
}
