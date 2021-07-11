import { http } from 'boot/axios';
import { DashboardDTO, DashboardModel } from 'src/models/dashboard/dashboard.model';

export default {
  async getAll(): Promise<DashboardModel[]> {
    return await http.get('/dashboard');
  },
  async getByID(id: number): Promise<DashboardModel> {
    return await http.get(`/dashboard/${id}`);
  },
  async create(payload: DashboardDTO): Promise<DashboardModel> {
    return await http.post('/dashboard/', payload);
  },
  async update(id: number, payload: Partial<DashboardModel>): Promise<DashboardModel> {
    return await http.patch(`/dashboard/${id}`, payload);
  },
  async delete(id: number) {
    return await http.delete(`/dashboard/${id}`);
  },
};
