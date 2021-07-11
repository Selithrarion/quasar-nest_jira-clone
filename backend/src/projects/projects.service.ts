import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectEntity } from './entity/project.entity';
import { Repository } from 'typeorm';
import { CreateProjectDTO, UpdateProjectDTO } from './dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projects: Repository<ProjectEntity>
  ) {}

  async getAll(query): Promise<ProjectEntity[]> {
    return await this.projects.find();
  }

  async getByID(id: number): Promise<ProjectEntity> {
    return await this.projects.findOneOrFail(id);
  }

  async create(projectData: CreateProjectDTO): Promise<ProjectEntity> {
    const createdProject = await this.projects.create(projectData);
    return createdProject;
  }

  async update(id: number, projectData: UpdateProjectDTO): Promise<ProjectEntity> {
    const updatedProject = await this.projects.update(id, projectData);
    return updatedProject;
  }

  async delete(id: number): Promise<void> {
    await this.projects.delete(id);
  }
}
