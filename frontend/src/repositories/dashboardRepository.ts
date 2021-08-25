import { http } from 'boot/axios';
import { DashboardDTO, DashboardModel } from 'src/models/dashboard/dashboard.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';

export default {
  async getAll(): Promise<DashboardModel[]> {
    const { data }: ApiResponseModel<DashboardModel[]> = await http.get('/dashboard');
    return data;
  },
  async getByID(id: number): Promise<DashboardModel> {
    const { data }: ApiResponseModel<DashboardModel> = await http.get(`/dashboard/${id}`);
    return data;
  },
  async create(dashboardData: DashboardDTO): Promise<DashboardModel> {
    const { data }: ApiResponseModel<DashboardModel> = await http.post('/dashboard', dashboardData);
    return data;
  },
  async update(id: number, dashboardData: DashboardDTO): Promise<DashboardModel> {
    const { data }: ApiResponseModel<DashboardModel> = await http.patch(`/dashboard/${id}`, dashboardData);
    return data;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/dashboard/${id}`);
  },
};
