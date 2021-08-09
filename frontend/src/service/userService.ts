import { http } from 'boot/axios';
import {
  UserAuthResponse,
  UserLoginDTO,
  UserModel,
  UserRegisterDTO,
  UserUpdateTokenDTO,
  UserUpdateTokenResponse,
} from 'src/models/user/user.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';

export default {
  async getSelf(): Promise<UserModel> {
    const { data }: ApiResponseModel = await http.get('/user/self');
    return data as UserModel;
  },
  async getByID(id: number): Promise<UserModel> {
    const { data }: ApiResponseModel = await http.get(`/user/${id}`);
    return data as UserModel;
  },

  async login(payload: UserLoginDTO): Promise<UserAuthResponse> {
    const { data }: ApiResponseModel = await http.post('/auth/login', payload);
    return data as UserAuthResponse;
  },
  async register(payload: UserRegisterDTO): Promise<UserAuthResponse> {
    const { data }: ApiResponseModel = await http.post('/auth/register', payload);
    return data as UserAuthResponse;
  },
  async forgotPassword(email: string): Promise<void> {
    return await http.post('/auth/forgot-password', { email });
  },
  async logout(): Promise<void> {
    return await http.post('/auth/logout');
  },
  async isUsernameTaken(username: string): Promise<boolean> {
    const params = { username };
    const { data }: ApiResponseModel = await http.get('/user/is-taken', { params });
    return data as boolean;
  },

  async updateTokens(payload: UserUpdateTokenDTO): Promise<UserUpdateTokenResponse> {
    const { data }: ApiResponseModel = await http.post('/auth/update-tokens', payload);
    return data as UserUpdateTokenResponse;
  },
};
