import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { UserEntity } from '../user/entity/user.entity';
import { BoardsService } from '../boards/boards.service';
import { UserService } from '../user/user.service';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projects: Repository<ProjectEntity>,

    @Inject(forwardRef(() => BoardsService))
    private readonly boardsService: BoardsService,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async getAll(query, userID: number): Promise<ProjectEntity[]> {
    const currentUser = await this.userRepository.getByID(userID);
    const allProjects = await this.projects.find({ order: { createdAt: 'DESC' } });
    const formattedProjects = allProjects.map((p) => ({
      ...p,
      favorite: currentUser.favoriteProjectIDs.includes(p.id),
    }));
    return formattedProjects;
  }

  async getByID(id: number): Promise<ProjectEntity> {
    return await this.projects.findOneOrFail(id, { relations: ['users'] });
  }

  async create(projectData: CreateProjectDTO, user: UserEntity): Promise<ProjectEntity> {
    const payload = { ...projectData, leader: user, users: [user] };
    const createdProject = await this.projects.save(payload);

    const defaultBoard = {
      name: projectData.key + projectData.name,
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

  async toggleFavorite(projectID: number, userID: number): Promise<void> {
    const userFavoriteProjects = await this.userRepository.getFavoriteProjects(userID);
    const projectIndex = userFavoriteProjects.findIndex((p) => p.id === projectID);

    if (projectIndex !== -1) {
      userFavoriteProjects.splice(projectIndex, 1);
      console.log('SPLICED', projectIndex, userFavoriteProjects);
    } else {
      const project = await this.projects.findOne(projectID);
      userFavoriteProjects.push(project);
    }

    await this.userRepository.update(userID, { favoriteProjects: userFavoriteProjects });
  }
}
