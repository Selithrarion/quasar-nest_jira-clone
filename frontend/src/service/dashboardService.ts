import { http } from 'boot/axios';
import { DashboardDTO, DashboardInterface } from 'src/models/dashboard/dashboard.interface';

export default {
  async getAll(): Promise<DashboardInterface[]> {
    return await http.get('/dashboard');
  },
  async getByID(id: number): Promise<DashboardInterface> {
    return await http.get(`/dashboard/${id}`);
  },
  async create(payload: DashboardDTO): Promise<DashboardInterface> {
    return await http.post('/dashboard/', payload);
  },
  async update(id: number, payload: Partial<DashboardInterface>): Promise<DashboardInterface> {
    return await http.patch(`/dashboard/${id}`, payload);
  },
  async delete(id: number) {
    return await http.delete(`/dashboard/${id}`);
  },
};
