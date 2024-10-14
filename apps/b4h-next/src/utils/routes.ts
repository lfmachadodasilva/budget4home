export const B4hApiRoutes = {
  login: '/api/auth/login',
  groups: '/api/groups'
};

export const B4hRoutes = {
  home: '/',

  login: '/login',
  logout: '/logout',
  register: '/register',
  reset: '/reset',

  groups: '/groups',
  groupsAdd: '/groups/add',

  labels: '/labels',
  labelsAdd: '/labels/add',

  expenses: '/expenses',
  expensesAdd: '/expenses/add'
};

export const B4hRoutesProtected = [B4hRoutes.groups, B4hRoutes.labels, B4hRoutes.expenses];
