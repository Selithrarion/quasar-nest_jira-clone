import { http } from 'boot/axios';
import { DashboardDTO, DashboardModel } from 'src/models/dashboard/dashboard.model';

export default {
  async getAll(): Promise<DashboardModel[]> {
    return await http.get('/dashboard');
  },
  async getByID(id: number): Promise<DashboardModel> {
    return await http.get(`/dashboard/${id}`);
  },
  async create(dashboardData: DashboardDTO): Promise<DashboardModel> {
    return await http.post('/dashboard', dashboardData);
  },
  async update(id: number, dashboardData: Partial<DashboardDTO>): Promise<DashboardModel> {
    return await http.patch(`/dashboard/${id}`, dashboardData);
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/dashboard/${id}`);
  },
};
