import { http } from 'boot/axios';
import { ProjectModel } from 'src/models/project/project.model';

export default {
  async getAll(): Promise<ProjectModel[]> {
    return await http.get('/projects');
  },
  async getByID(id: number): Promise<ProjectModel> {
    return await http.get(`/projects/${id}`);
  },
  async create(project: CreateProjectDTO): Promise<ProjectModel> {
    return await http.get(`/projects/${id}`);
  },
};
