import { B4hRoutes } from '../util/routes';

const common: { [key: string]: string } = {
  title: 'budget4home',
  header_home: 'home',
  header_groups: 'groups',
  header_labels: 'labels',
  header_expenses: 'expenses',
  header_reports: 'reports'
};

const groups = {
  ...common,
  title: 'budget4home - groups',
  header: 'groups'
};

const labels = {
  ...common,
  title: 'budget4home - labels',
  header: 'labels'
};

const expenses = {
  ...common,
  title: 'budget4home - expenses',
  header: 'expenses'
};

const reports = {
  ...common,
  title: 'budget4home - reports',
  header: 'reports'
};

export const en = {
  [B4hRoutes.home]: { ...common },
  [B4hRoutes.groups]: groups,
  [B4hRoutes.labels]: labels,
  [B4hRoutes.expenses]: expenses,
  [B4hRoutes.reports]: reports
};
