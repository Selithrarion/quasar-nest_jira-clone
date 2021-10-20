import { MutationTree } from 'vuex';
import { Cookies } from 'quasar';
import { UserStateInterface } from './state';
import { UserAuthResponse, UserDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';
import { http } from 'boot/axios';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_USER(state: UserStateInterface, { user, accessToken, refreshToken }: UserAuthResponse) {
    state.currentUser = user;
    state.token = accessToken;
    state.refreshToken = refreshToken;
    Cookies.set('user', JSON.stringify({ ...user, accessToken, refreshToken }));
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    http.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  },
  LOGOUT_USER(state: UserStateInterface) {
    state.currentUser = null;
    state.token = null;
    state.refreshToken = null;
    Cookies.remove('user');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    http.defaults.headers.common.Authorization = null;
  },
  UPDATE_TOKENS(state: UserStateInterface, { accessToken, refreshToken }: UserUpdateTokenResponse) {
    console.log('UPD TOK MUT', accessToken, refreshToken, state.currentUser);
    state.token = accessToken;
    state.refreshToken = refreshToken;
    Cookies.set('user', JSON.stringify({ ...state.currentUser, accessToken, refreshToken }));
  },

  UPDATE_USER(state: UserStateInterface, payload: UserDTO) {
    if (state.currentUser) state.currentUser = { ...state.currentUser, ...payload };
  },
};

export default mutation;
