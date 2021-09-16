import {
  UserAuthResponse,
  UserLoginDTO,
  UserModel,
  UserRegisterDTO,
  UserUpdateTokenDTO,
  UserUpdateTokenResponse,
} from 'src/models/user/user.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { http } from 'boot/axios';

export default {
  async getSelf(): Promise<UserModel> {
    const { data }: ApiResponseModel<UserModel> = await http.get('/user/self');
    return data;
  },
  async updateTokens(payload: UserUpdateTokenDTO): Promise<UserUpdateTokenResponse> {
    const { data }: ApiResponseModel<UserUpdateTokenResponse> = await http.post('/auth/update-tokens', payload);
    return data;
  },

  async login(payload: UserLoginDTO): Promise<UserAuthResponse> {
    const { data }: ApiResponseModel<UserAuthResponse> = await http.post('/auth/login', payload);
    return data;
  },
  async register(payload: UserRegisterDTO): Promise<UserAuthResponse> {
    const { data }: ApiResponseModel<UserAuthResponse> = await http.post('/auth/register', payload);
    return data;
  },
  async forgotPassword(email: string): Promise<void> {
    return await http.post('/auth/forgot-password', { email });
  },
  async logout(): Promise<void> {
    return await http.post('/auth/logout');
  },

  async authWithGoogle(token: string): Promise<UserAuthResponse> {
    const { data }: ApiResponseModel<UserAuthResponse> = await http.post('/auth/google-auth', { token });
    return data;
  },
};
