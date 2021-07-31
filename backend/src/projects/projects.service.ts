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
    username: 'mock123',
    password: 'password',
    email: 'mock@yande.xru',
    locale: 'ru',
    isActive: true,
    avatarURL: null,
    assignedIssues: [],
    watchingIssues: [],
    projects: [],
    projectIDs: [],
    favoriteProjects: [],
    favoriteProjectIDs: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  async getAll(query): Promise<ProjectEntity[]> {
    const allProjects = await this.projects.find({ order: { createdAt: 'DESC' } });
    const formattedProjects = allProjects.map((p) => ({
      ...p,
      // favorite: this.mockUser.favoriteProjectIDs.includes(p.id)
    }));
    return formattedProjects;
  }

  async getByID(id: number): Promise<ProjectEntity> {
    // return await this.projects.findOneOrFail(id, { relations: ['users'] });
    const project = await this.projects.findOneOrFail(id);
    const formattedMockProject = { ...project, leader: this.mockUser, users: [this.mockUser] };
    console.log(formattedMockProject);
    return formattedMockProject;
  }

  async create(projectData: CreateProjectDTO): Promise<ProjectEntity> {
    // const leader = this.mockUser;
    // const payload = { ...projectData, leader, users: [leader] };
    const payload = { ...projectData };
    const createdProject = await this.projects.save(payload);
    // console.log(createdProject);
    const defaultBoard = {
      name: projectData.key + projectData.name,
      favorite: false,
      project: createdProject,
    };

    await this.boardsService.create(defaultBoard);

    return createdProject;
  }

  async update(id: number, projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    const toUpdate = await this.projects.findOneOrFail(id);
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
