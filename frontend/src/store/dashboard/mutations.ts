import { MutationTree } from 'vuex';
import { DashboardStateInterface } from './state';
import { DashboardInterface } from 'src/models/dashboard/dashboard.interface';

const mutation: MutationTree<DashboardStateInterface> = {
  SET_DASHBOARDS(state: DashboardStateInterface, dashboards: DashboardInterface[]) {
    state.dashboards = dashboards;
  },
  SET_DASHBOARD_DETAIL(state: DashboardStateInterface, dashboard: DashboardInterface) {
    state.dashboardDetail = dashboard;
  },
};

export default mutation;
