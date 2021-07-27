import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { IssueDTO, IssueModel } from 'src/models/project/issue.model';

export default {
  async getByID(id: number): Promise<IssueModel> {
    const { data }: ApiResponseModel = await http.get(`/issues/${id}`);
    return data as IssueModel;
  },
  async create(payload: IssueDTO): Promise<IssueModel> {
    const { data }: ApiResponseModel = await http.post('/issues', payload);
    return data as IssueModel;
  },
  async update(id: number, payload: Partial<IssueDTO>): Promise<IssueModel> {
    const { data }: ApiResponseModel = await http.patch(`/issues/${id}`, payload);
    return data as IssueModel;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/issues/${id}`);
  },
};
