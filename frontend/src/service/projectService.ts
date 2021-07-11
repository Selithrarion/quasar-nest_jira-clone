import { http } from 'boot/axios';
import { ProjectDTO, ProjectModel } from 'src/models/project/project.model';

export default {
  async getAll(): Promise<ProjectModel[]> {
    return await http.get('/projects');
  },
  async getByID(id: number): Promise<ProjectModel> {
    return await http.get(`/projects/${id}`);
  },
  async create(projectData: ProjectDTO): Promise<ProjectModel> {
    return await http.post('/projects', projectData);
  },
  async update(id: number, projectData: Partial<ProjectDTO>): Promise<ProjectModel> {
    return await http.patch(`/projects/${id}`, projectData);
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/projects/${id}`);
  },
};
