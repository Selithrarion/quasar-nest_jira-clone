import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { NotificationModel } from 'src/models/user/notification.model';

export default {
  async getAll(): Promise<NotificationModel[]> {
    const { data }: ApiResponseModel<NotificationModel[]> = await http.get('/notification');
    return data;
  },
  async readByID(id: number): Promise<void> {
    await http.patch(`/notification/${id}`);
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/notification/${id}`);
  },
};
