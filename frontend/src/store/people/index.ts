import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { PeopleStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const userModule: Module<PeopleStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state,
};

export default userModule;
