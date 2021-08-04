import { UserModel } from 'src/models/user/user.model';

export interface UserStateInterface {
  currentUser: UserModel | null;
  token: string | null;
  refreshToken: string | null;
}

function state(): UserStateInterface {
  return {
    currentUser: null,
    token: null,
    refreshToken: null,
  };
}

export default state;
