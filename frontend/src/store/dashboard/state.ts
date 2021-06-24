import { DashboardInterface } from 'components/dashboard/models/dashboard.interface';

export interface DashboardStateInterface {
  dashboards?: DashboardInterface[] | null;
  dashboardDetail?: DashboardInterface | null;
}

function state(): DashboardStateInterface {
  return {
    dashboards: null,
    dashboardDetail: null,
  };
}

export default state;
