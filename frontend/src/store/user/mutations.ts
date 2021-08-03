import { MutationTree } from 'vuex';
import { Cookies } from 'quasar';
import { UserStateInterface } from './state';
import { UserAuthResponse } from 'src/models/user/user.model';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_USER(state: UserStateInterface, { user, accessToken }: UserAuthResponse) {
    state.currentUser = user;
    state.token = accessToken;
    Cookies.set('user', JSON.stringify({ ...user, accessToken }));
    // TODO: add refresh tokens
  },
  LOGOUT_USER(state: UserStateInterface) {
    state.currentUser = null;
    state.token = null;
    Cookies.remove('user');
  },
};

export default mutation;
