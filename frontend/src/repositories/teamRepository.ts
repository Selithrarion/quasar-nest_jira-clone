import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { TeamDTO, TeamModel } from 'src/models/user/team.model';
import { PublicFileModel } from 'src/models/common/public.file.model';
import { UserModel } from 'src/models/user/user.model';

export default {
  async getByID(id: number): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.get(`/team/${id}`);
    return data;
  },
  async create(payload: TeamDTO): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.post('/team', payload);
    return data;
  },
  async update(id: number, payload: TeamDTO): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.patch(`/team/${id}`, payload);
    return data;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/team/${id}`);
  },

  async addUsers(id: number, users: UserModel[]): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.patch(`/team/add-users/${id}`, { users });
    return data;
  },

  async uploadAvatar(file: File, id: number): Promise<PublicFileModel> {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post(`team/avatar/${id}`, form);
    return data;
  },

  async uploadHeader(file: File, id: number): Promise<PublicFileModel> {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post(`team/header/${id}`, form);
    return data;
  },
  async deleteHeader(): Promise<void> {
    await http.delete('team/header');
  },
};
