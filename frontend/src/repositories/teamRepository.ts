import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { TeamDTO, TeamModel } from 'src/models/user/team.model';
import { PublicFileModel } from 'src/models/common/public.file.model';

export default {
  async getByID(id: number): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.get(`/team/${id}`);
    return data;
  },
  async create(payload: TeamDTO): Promise<TeamModel> {
    const { data }: ApiResponseModel<TeamModel> = await http.post('/team', payload);
    return data;
  },
  async update(id: number, payload: TeamDTO) {
    const { data }: ApiResponseModel<TeamModel> = await http.patch(`/team/${id}`, payload);
    return data;
  },

  async uploadAvatar(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post('team/upload-avatar', form);
    return data;
  },

  async uploadHeader(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post('team/upload-avatar', form);
    return data;
  },
  async deleteHeader() {
    await http.delete('team/header');
    return null;
  },
};
