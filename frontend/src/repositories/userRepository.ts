import { http } from 'boot/axios';
import {
  UserAuthResponse,
  UserDTO,
  UserLoginDTO,
  UserModel,
  UserRegisterDTO,
  UserUpdateTokenDTO,
  UserUpdateTokenResponse,
} from 'src/models/user/user.model';
import { ApiResponseModel } from 'src/models/common/apiResponse.model';
import { PublicFileModel } from 'src/models/common/public.file.model';

export default {
  async searchUsers(search = ''): Promise<UserModel[]> {
    const params = {
      search,
    };
    const { data }: ApiResponseModel<UserModel[]> = await http.get('/user', { params });
    return data;
  },

  async getSelf(): Promise<UserModel> {
    const { data }: ApiResponseModel<UserModel> = await http.get('/user/self');
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
  async isUsernameTaken(username: string): Promise<boolean> {
    const params = { username };
    const { data }: ApiResponseModel<boolean> = await http.get('/user/is-taken', { params });
    return data;
  },

  async updateTokens(payload: UserUpdateTokenDTO): Promise<UserUpdateTokenResponse> {
    const { data }: ApiResponseModel<UserUpdateTokenResponse> = await http.post('/auth/update-tokens', payload);
    return data;
  },

  async getByID(id: number): Promise<UserModel> {
    const { data }: ApiResponseModel<UserModel> = await http.get(`/user/${id}`);
    return data;
  },
  async update(id: number, payload: UserDTO) {
    const { data }: ApiResponseModel<UserModel> = await http.patch(`/user/${id}`, payload);
    return data;
  },

  async uploadAvatar(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post('user/avatar', form);
    return data;
  },
  async uploadHeader(file: File) {
    const form = new FormData();
    form.append('file', file);
    const { data }: ApiResponseModel<PublicFileModel> = await http.post('user/header', form);
    return data;
  },
  async deleteHeader() {
    await http.delete('user/header');
    return null;
  },

  async sendEmailChange(id: number) {
    await http.post('/user/change-email', id);
  },
  async validateEmailChangeCode(id: number, code: number | string) {
    await http.post('/user/change-email-validate-code', { id, code });
  },
};
