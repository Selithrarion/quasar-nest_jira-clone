import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { IssueDTO, IssueModel } from 'src/models/project/issue.model';
import { CommentModel } from 'src/models/project/comment.model';

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

  async addComment(issueID: number, text: string): Promise<CommentModel> {
    const { data }: ApiResponseModel = await http.post(`/issues/comment/${issueID}`, { text });
    return data as CommentModel;
  },
  async editComment(commentID: number, text: string): Promise<CommentModel> {
    const { data }: ApiResponseModel = await http.patch(`/issues/comment/${commentID}`, { text });
    return data as CommentModel;
  },
  async deleteComment(commentID: number): Promise<void> {
    return await http.delete(`/issues/comment/${commentID}`);
  },
};
