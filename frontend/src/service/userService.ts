import { http } from 'boot/axios';
import { UserAuthResponse, UserLoginDTO, UserRegisterDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';

export default {
  async login(payload: UserLoginDTO): Promise<UserAuthResponse> {
    return await http.post('/auth/login', payload);
  },
  async register(payload: UserRegisterDTO): Promise<UserAuthResponse> {
    return await http.post('/auth/register', payload);
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
