import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { DashboardStateInterface } from './state';
import actions from './actions';
import mutations from './mutations';

const dashboardModule: Module<DashboardStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  mutations,
  state
};

export default dashboardModule;
