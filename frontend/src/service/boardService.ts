import { http } from 'boot/axios';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { BoardDTO, BoardModel } from 'src/models/project/board.model';

export default {
  async getByID(boardID: number): Promise<BoardModel> {
    const { data }: ApiResponseModel = await http.get(`/boards/${boardID}`);
    return data as BoardModel;
  },
  async create(boardData: BoardDTO): Promise<BoardModel> {
    const { data }: ApiResponseModel = await http.post('/boards', boardData);
    return data as BoardModel;
  },
  async update(id: number, boardData: Partial<BoardDTO>): Promise<BoardModel> {
    const { data }: ApiResponseModel = await http.patch(`/boards/${id}`, boardData);
    return data as BoardModel;
  },
  async delete(id: number): Promise<void> {
    return await http.delete(`/boards/${id}`);
  },

  async toggleFavorite(id: number): Promise<void> {
    return await http.post(`/boards/favorite/${id}`);
  },
};
