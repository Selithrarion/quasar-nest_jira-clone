import { http } from 'boot/axios';
import { DashboardDTO, DashboardModel } from 'src/models/dashboard/dashboard.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';

export default {
  async getAll(): Promise<DashboardModel[]> {
    const { data }: ApiResponseModel = await http.get('/dashboard');
    return data as DashboardModel[];
  },
  async getByID(id: number): Promise<DashboardModel> {
    const { data }: ApiResponseModel = await http.get(`/dashboard/${id}`);
    return data as DashboardModel;
  },
  async create(dashboardData: DashboardDTO): Promise<DashboardModel> {
    const { data }: ApiResponseModel = await http.post('/dashboard', dashboardData);
    return data as DashboardModel;
  },
  async update(id: number, dashboardData: Partial<DashboardDTO>): Promise<DashboardModel> {
    const { data }: ApiResponseModel = await http.patch(`/dashboard/${id}`, dashboardData);
    return data as DashboardModel;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/dashboard/${id}`);
  },
};
