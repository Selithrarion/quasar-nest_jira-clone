import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { TeamDTO, TeamModel } from 'src/models/user/team.model';

export default {
  async getTeamByID(id: number): Promise<TeamModel> {
    const { data }: ApiResponseModel = await http.get(`/user/${id}`);
    return data as TeamModel;
  },
  async updateTeam(id: number, payload: TeamDTO) {
    const { data }: ApiResponseModel = await http.patch(`/user/${id}`, payload);
    return data as TeamModel;
  },
};
