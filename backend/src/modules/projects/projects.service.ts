import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { IPaginationOptions, paginate, Pagination } from 'nestjs-typeorm-paginate/index';

import { ProjectEntity } from './entity/project.entity';
import { UserEntity } from '../user/entity/user.entity';
import { IssueEntity } from '../issues/entity/issue.entity';

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

  async getAll(query: IPaginationOptions = { page: 1, limit: 10 }, userID: number): Promise<Pagination<ProjectEntity>> {
    const currentUser = await this.userService.getByID(userID);
    const { items, meta } = await paginate<ProjectEntity>(this.projects, query, { order: { createdAt: 'DESC' } });
    const formattedProjects = items.map((p) => ({
      ...p,
      favorite: currentUser.favoriteProjectIDs.includes(p.id),
    })) as ProjectEntity[];
    return { items: formattedProjects, meta };
  }

  async getByID(id: number): Promise<ProjectEntity> {
    return await this.projects.findOneOrFail(id, { relations: ['users'] });
  }

  async getIssuesByProjectID(id: number): Promise<IssueEntity[]> {
    const project = await this.projects.findOneOrFail(id, { relations: ['issues'] });
    return project.issues;
  }

  async create(payload: CreateProjectDTO, user: UserEntity): Promise<ProjectEntity> {
    const createdProject = await this.projects.save({
      ...payload,
      leader: user,
      users: [user],
    });

    const defaultBoard = {
      name: payload.key + payload.name,
      project: createdProject,
    };
    await this.boardsService.create(defaultBoard);

    return createdProject;
  }

  async update(id: number, projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    const toUpdate = await this.projects.findOneOrFail(id);
    const updated = this.projects.create({ ...toUpdate, ...projectData });
    await this.projects.save(updated);
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.projects.delete(id);
  }

  async toggleFavorite(projectID: number, userID: number): Promise<void> {
    const userFavoriteProjects = await this.userService.getFavoriteProjects(userID);
    const projectIndex = userFavoriteProjects.findIndex((p) => p.id === projectID);

    if (projectIndex !== -1) {
      userFavoriteProjects.splice(projectIndex, 1);
    } else {
      const project = await this.projects.findOne(projectID);
      userFavoriteProjects.push(project);
    }

    await this.userService.update(userID, { favoriteProjects: userFavoriteProjects });
  }
}
