export interface UserModel {
  readonly id: number;
  name: string;
  email: string;
  locale: string;
  isActive: boolean;
  avatarURL: string;
}
