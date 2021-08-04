import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from 'src/store/user/state';
import { UserLoginDTO, UserRegisterDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';
import userService from 'src/service/userService';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async login({ commit }, payload: UserLoginDTO) {
    const data = await userService.login(payload);
    commit('AUTH_USER', data);
  },
  async register({ commit }, payload: UserRegisterDTO) {
    const data = await userService.register(payload);
    commit('AUTH_USER', data);
  },
  async logout({ commit }) {
    await userService.logout();
    commit('LOGOUT_USER');
  },

  async loadUser({ commit }, { accessToken, refreshToken }: UserUpdateTokenResponse) {
    const user = await userService.getSelf();
    commit('AUTH_USER', { user, accessToken, refreshToken });
  },
  async updateTokens({ state, commit }) {
    if (!state.refreshToken || !state.currentUser) return;

    const payload = {
      userID: state.currentUser.id,
      email: state.currentUser.email,
      refreshToken: state.refreshToken,
    };
    const tokens = await userService.updateTokens(payload);
    commit('UPDATE_TOKENS', tokens);

    return tokens;
  },
};

export default actions;
