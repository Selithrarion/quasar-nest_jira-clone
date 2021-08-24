import { MutationTree } from 'vuex';
import { Cookies } from 'quasar';
import { UserStateInterface } from './state';
import { UserAuthResponse, UserDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_USER(state: UserStateInterface, { user, accessToken, refreshToken }: UserAuthResponse) {
    state.currentUser = user;
    state.token = accessToken;
    state.refreshToken = refreshToken;
    Cookies.set('user', JSON.stringify({ ...user, accessToken, refreshToken }));
  },
  LOGOUT_USER(state: UserStateInterface) {
    state.currentUser = null;
    state.token = null;
    state.refreshToken = null;
    Cookies.remove('user');
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
