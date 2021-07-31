import { http } from 'boot/axios';
import { LoginDTO, RegisterDTO } from 'src/models/user/user.model';

export default {
  async login(payload: LoginDTO): Promise<void> {
    return await http.post('/auth/login', payload);
  },
  async register(payload: RegisterDTO): Promise<void> {
    return await http.post('/auth/register', payload);
  },
  async forgotPassword(email: string): Promise<void> {
    return await http.post('/auth/forgot-password', { email });
  },
  async logout(): Promise<void> {
    return await http.post('/auth/logout');
  },
};
