import { http } from 'boot/axios';
import { UserAuthResponse, UserLoginDTO, UserRegisterDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';

export default {
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

  async updateTokens(): Promise<UserUpdateTokenResponse> {
    return await http.post('/auth/token');
  },
};
