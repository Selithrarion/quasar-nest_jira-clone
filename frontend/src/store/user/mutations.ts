import { MutationTree } from 'vuex';
import { UserStateInterface } from './state';
import { UserAuthResponse } from 'src/models/user/user.model';

const mutation: MutationTree<UserStateInterface> = {
  AUTH_USER(state: UserStateInterface, { user, token }: UserAuthResponse) {
    state.currentUser = user;
    state.token = token;
  },
};

export default mutation;
