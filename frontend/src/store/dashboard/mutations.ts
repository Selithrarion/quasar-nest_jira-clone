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
};

export default mutation;
