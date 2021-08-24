import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { TeamDTO, TeamModel } from 'src/models/user/team.model';
import { PublicFileModel } from 'src/models/common/public.file.model';

export default {
  async getByID(id: number): Promise<TeamModel> {
    const { data }: ApiResponseModel = await http.get(`/user/${id}`);
    return data as TeamModel;
  },
  async update(id: number, payload: TeamDTO) {
    const { data }: ApiResponseModel = await http.patch(`/user/${id}`, payload);
    return data as TeamModel;
  },

  async uploadAvatar(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel = await http.post('team/upload-avatar', form);
    return data as PublicFileModel;
  },
  async uploadHeader(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel = await http.post('team/upload-avatar', form);
    return data as PublicFileModel;
  },
};
