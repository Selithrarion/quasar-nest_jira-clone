import { http } from 'boot/axios';
import { ProjectDTO, ProjectModel } from 'src/models/project/project.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { IssueModel } from 'src/models/project/issue.model';

export default {
  async getAll({ page = 1, limit = 5 } = { page: 1, limit: 5 }): Promise<ProjectModel[]> {
    const { data }: ApiResponseModel<ProjectModel[]> = await http.get('/projects', { params: { page, limit } });
    return data;
  },
  async getByID(id: number): Promise<ProjectModel> {
    const { data }: ApiResponseModel<ProjectModel> = await http.get(`/projects/${id}`);
    return data;
  },
  async create(projectData: ProjectDTO): Promise<ProjectModel> {
    const { data }: ApiResponseModel<ProjectModel> = await http.post('/projects', projectData);
    return data;
  },
  async update(id: number, projectData: Partial<ProjectDTO>): Promise<ProjectModel> {
    const { data }: ApiResponseModel<ProjectModel> = await http.patch(`/projects/${id}`, projectData);
    return data;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/projects/${id}`);
  },

  async toggleFavorite(id: number): Promise<void> {
    return await http.post(`/projects/favorite/${id}`);
  },

  async getIssuesByProjectID(id: number): Promise<IssueModel[]> {
    const { data }: ApiResponseModel<IssueModel[]> = await http.get(`/projects/${id}/issues`);
    return data;
  },
};
