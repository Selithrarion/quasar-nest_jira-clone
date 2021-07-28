import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { UserStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const userModule: Module<UserStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default userModule;
