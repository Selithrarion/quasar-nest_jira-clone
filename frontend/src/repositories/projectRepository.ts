import { http } from 'boot/axios';
import { ProjectDTO, ProjectModel } from 'src/models/project/project.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { IssueModel } from 'src/models/project/issue.model';

export default {
  async getAll(): Promise<ProjectModel[]> {
    const { data }: ApiResponseModel<ProjectModel[]> = await http.get('/projects');
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

  async getIssuesByProjectID(projectID: number): Promise<IssueModel[]> {
    const { data }: ApiResponseModel<IssueModel[]> = await http.get(`/projects/${projectID}/issues/`);
    return data;
  },
};
