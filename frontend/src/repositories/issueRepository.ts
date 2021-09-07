import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { IssueDTO, IssueModel } from 'src/models/project/issue.model';
import { CommentModel } from 'src/models/project/comment.model';

export default {
  async getByID(id: number): Promise<IssueModel> {
    const { data }: ApiResponseModel<IssueModel> = await http.get(`/issues/${id}`);
    return data;
  },

  async create(payload: IssueDTO): Promise<IssueModel> {
    const { data }: ApiResponseModel<IssueModel> = await http.post('/issues', payload);
    return data;
  },
  async update(id: number, payload: Partial<IssueDTO>): Promise<IssueModel> {
    const { data }: ApiResponseModel<IssueModel> = await http.patch(`/issues/${id}`, payload);
    return data;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/issues/${id}`);
  },

  async addComment(issueID: number, text: string): Promise<CommentModel> {
    const { data }: ApiResponseModel<CommentModel> = await http.post(`/issues/comment/${issueID}`, { text });
    return data;
  },
  async editComment(commentID: number, text: string): Promise<CommentModel> {
    const { data }: ApiResponseModel<CommentModel> = await http.patch(`/issues/comment/${commentID}`, { text });
    return data;
  },
  async deleteComment(commentID: number): Promise<void> {
    return await http.delete(`/issues/comment/${commentID}`);
  },
};
