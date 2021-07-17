import { MutationTree } from 'vuex';
import { DashboardStateInterface } from './state';
import { DashboardModel } from 'src/models/dashboard/dashboard.model';

const mutation: MutationTree<DashboardStateInterface> = {
  SET_DASHBOARDS(state: DashboardStateInterface, dashboards: DashboardModel[]) {
    state.dashboards = dashboards;
  },
  SET_DASHBOARD_DETAIL(state: DashboardStateInterface, dashboard: DashboardModel) {
    state.dashboardDetail = dashboard;
  },
  ADD_DASHBOARD(state: DashboardStateInterface, dashboard: DashboardModel) {
    state.dashboards?.push(dashboard);
  },
  UPDATE_DASHBOARD(state: DashboardStateInterface, dashboard: DashboardModel) {
    if (!state.dashboards) return;
    const index = state.dashboards.findIndex((d) => d.id === dashboard.id);
    state.dashboards[index] = dashboard;
  },
  DELETE_DASHBOARD(state: DashboardStateInterface, id: number) {
    if (!state.dashboards) return;
    const index = state.dashboards.findIndex((d) => d.id === id);
    state.dashboards.splice(index, 1)
  },
};

export default mutation;
