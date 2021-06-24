import { http } from 'boot/axios';
import { ProjectInterface } from 'components/project/models/project.interface';

export default {
  async get(): Promise<ProjectInterface[]> {
    return await http.get('/project');
  },
  async getByID(id: number): Promise<ProjectInterface> {
    return await http.get(`/project/${id}`);
  },
};
