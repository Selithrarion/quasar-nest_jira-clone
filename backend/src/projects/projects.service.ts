import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';
import { UserEntity } from '../user/entity/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projects: Repository<ProjectEntity>
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
    const createdProject = await this.projects.save({ ...projectData, leader: this.mockUser });
    return createdProject;
  }

  // async update(id: number, projectData: UpdateProjectDTO): Promise<ProjectEntity> {
  //   const toUpdate = await this.projects.find({ id });
  //   const updated = { ...toUpdate, ...projectData };
  //   await this.projects.save(updated);
  //   console.log('update project', updated);
  //   return updated;
  // }

  async delete(id: number): Promise<void> {
    await this.projects.delete(id);
  }

  async toggleFavorite(id: number): Promise<void> {
    // const user = this.mockUser
    // const filteredFavorites = user.favoriteProjectsIDs.filter(p => p.id !== id)
    // await this.users.update(id);
  }
}
