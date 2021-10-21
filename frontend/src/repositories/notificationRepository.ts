import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { NotificationModel } from 'src/models/user/notification.model';

export default {
  async getAll(): Promise<NotificationModel[]> {
    const { data }: ApiResponseModel<NotificationModel[]> = await http.get('/notifications');
    return data;
  },

  async readAll(): Promise<void> {
    await http.post('/notifications/read-all');
  },

  async update(id: number, payload: Partial<NotificationModel>): Promise<void> {
    await http.patch(`/notifications/${id}`, payload);
  },

  async delete(id: number): Promise<void> {
    return await http.delete(`/notifications/${id}`);
  },
};
