import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { UserStateInterface } from 'src/store/user/state';
import { UserLoginDTO, UserRegisterDTO } from 'src/models/user/user.model';
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
};

export default actions;
