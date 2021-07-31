import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { ColumnDTO, ColumnModel } from 'src/models/project/column.model';

export default {
  async create(payload: ColumnDTO): Promise<ColumnModel> {
    const { data }: ApiResponseModel = await http.post('/columns', payload);
    return data as ColumnModel;
  },
  async update(id: number, payload: Partial<ColumnDTO>): Promise<ColumnModel> {
    const { data }: ApiResponseModel = await http.patch(`/columns/${id}`, payload);
    return data as ColumnModel;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/columns/${id}`);
  },
};
