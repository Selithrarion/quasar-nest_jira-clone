import { http } from 'boot/axios';
import { UserDTO, UserModel } from 'src/models/user/user.model';
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

  async isUsernameTaken(username: string): Promise<boolean> {
    const params = { username };
    const { data }: ApiResponseModel<boolean> = await http.get('/user/is-username-taken', { params });
    return data;
  },
  async isEmailTaken(email: string): Promise<boolean> {
    const params = { email };
    const { data }: ApiResponseModel<boolean> = await http.get('/user/is-email-taken', { params });
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

  async confirmEmail(token: string): Promise<boolean> {
    const { data }: ApiResponseModel<boolean> = await http.post('/email-verification', { token });
    return data;
  },
  async resendEmailConfirmation(): Promise<void> {
    const { data }: ApiResponseModel<void> = await http.post('/email-verification/resend');
    return data;
  },

  async sendEmailChange(id: number) {
    await http.post('/user/change-email', id);
  },
  async validateEmailChangeCode(id: number, code: number | string) {
    await http.post('/user/change-email-validate-code', { id, code });
  },
};
