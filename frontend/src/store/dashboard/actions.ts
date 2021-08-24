import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DashboardStateInterface } from './state';
import dashboardRepository from 'src/repositories/dashboardRepository';

const actions: ActionTree<DashboardStateInterface, StateInterface> = {
  async getAll({ commit }) {
    const data = await dashboardRepository.getAll();
    commit('SET_DASHBOARDS', data);
  },
  async getByID({ commit }, id) {
    const data = await dashboardRepository.getByID(id);
    commit('SET_DASHBOARD_DETAIL', data);
  },
  async create({ commit }, dashboardData) {
    const dashboard = await dashboardRepository.create(dashboardData);
    commit('ADD_DASHBOARD', dashboard);
    return dashboard;
  },
  async update({ commit }, { id, dashboardData }) {
    const dashboard = await dashboardRepository.update(id, dashboardData);
    commit('UPDATE_DASHBOARD', dashboard);
  },
  async delete({ commit }, id) {
    await dashboardRepository.delete(id);
    commit('DELETE_DASHBOARD', id);
  },
};

export default actions;
