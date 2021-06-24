import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { DashboardStateInterface } from './state';
import dashboardService from 'src/service/dashboardService';

const actions: ActionTree<DashboardStateInterface, StateInterface> = {
  async fetchDashboards({ commit }) {
    const data = await dashboardService.get();
    commit('SET_DASHBOARDS', data);
  },
  async fetchDashboardDetail({ commit }, id) {
    const data = await dashboardService.getByID(id);
    commit('SET_DASHBOARD_DETAIL', data);
  },
};

export default actions;
