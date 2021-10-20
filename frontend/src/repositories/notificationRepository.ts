import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { NotificationModel } from 'src/models/user/notification.model';

export default {
  async getAll(): Promise<NotificationModel[]> {
    const { data }: ApiResponseModel<NotificationModel[]> = await http.get('/notifications');
    return data;
  },
  async readByID(id: number): Promise<void> {
    await http.patch(`/notifications/read/${id}`);
  },
  async toggleRead(id: number): Promise<void> {
    await http.patch(`/notifications/toggle-read/${id}`);
  },

  async delete(id: number): Promise<void> {
    return await http.delete(`/notifications/${id}`);
  },
};
