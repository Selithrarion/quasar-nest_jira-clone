import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from 'src/store/user/state';
import { UserAuthResponse, UserLoginDTO, UserRegisterDTO, UserUpdateTokenResponse } from 'src/models/user/user.model';
import authRepository from 'src/repositories/authRepository';

const actions: ActionTree<UserStateInterface, StateInterface> = {
  async login({ commit }, payload: UserLoginDTO): Promise<UserAuthResponse> {
    const data = await authRepository.login(payload);
    commit('AUTH_USER', data);
    return data;
  },
  async register({ commit }, payload: UserRegisterDTO) {
    const data = await authRepository.register(payload);
    commit('AUTH_USER', data);
  },
  logout({ commit }) {
    commit('LOGOUT_USER');
    return;
  },

  async authWithGoogle({ commit }, token) {
    const data = await authRepository.authWithGoogle(token);
    commit('AUTH_USER', data);
  },

  async loadUser({ commit }, { accessToken, refreshToken }: UserUpdateTokenResponse) {
    const user = await authRepository.getSelf();
    commit('AUTH_USER', { user, accessToken, refreshToken });
  },
  async updateTokens({ state, commit }) {
    if (!state.refreshToken || !state.currentUser) return;

    const payload = {
      userID: state.currentUser.id,
      email: state.currentUser.email,
      refreshToken: state.refreshToken,
    };
    const tokens = await authRepository.updateTokens(payload);
    commit('UPDATE_TOKENS', tokens);

    return tokens;
  },
};

export default actions;
