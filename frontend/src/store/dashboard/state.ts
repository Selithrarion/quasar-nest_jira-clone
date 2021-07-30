import { DashboardModel } from 'src/models/dashboard/dashboard.model';

export interface DashboardStateInterface {
  dashboards: DashboardModel[] | null;
  dashboardDetail: DashboardModel | null;
}

function state(): DashboardStateInterface {
  return {
    dashboards: null,
    dashboardDetail: null,
  };
}

export default state;
