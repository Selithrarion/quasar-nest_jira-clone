import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DashboardStateInterface } from './state';
import dashboardService from 'src/service/dashboardService';

const actions: ActionTree<DashboardStateInterface, StateInterface> = {
  async getAll({ commit }) {
    const data = await dashboardService.getAll();
    commit('SET_DASHBOARDS', data);
  },
  async getByID({ commit }, id) {
    const data = await dashboardService.getByID(id);
    commit('SET_DASHBOARD_DETAIL', data);
  },
  async create({ commit }, dashboardData) {
    const dashboard = await dashboardService.create(dashboardData);
    commit('ADD_DASHBOARD', dashboard);
  },
  async update({ commit }, { id, dashboardData }) {
    const dashboard = await dashboardService.update(id, dashboardData);
    commit('UPDATE_DASHBOARD', dashboard);
  },
  async delete({ commit }, id) {
    await dashboardService.delete(id);
    commit('DELETE_DASHBOARD', id);
  },
};

export default actions;
