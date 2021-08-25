import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { BoardDTO, BoardModel } from 'src/models/project/board.model';

export default {
  async getByID(boardID: number): Promise<BoardModel> {
    const { data }: ApiResponseModel<BoardModel> = await http.get(`/boards/${boardID}`);
    return data;
  },
  async create(boardData: BoardDTO): Promise<BoardModel> {
    const { data }: ApiResponseModel<BoardModel> = await http.post('/boards', boardData);
    return data;
  },
  async update(id: number, boardData: Partial<BoardDTO>): Promise<BoardModel> {
    const { data }: ApiResponseModel<BoardModel> = await http.patch(`/boards/${id}`, boardData);
    return data;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/boards/${id}`);
  },

  async toggleFavorite(id: number): Promise<void> {
    return await http.post(`/boards/favorite/${id}`);
  },
};
