export const B4hApiRoutes = {
  login: '/api/auth/login',
  groups: '/api/groups',
  expenses: (groupId: string) => `/api/groups/${groupId}/expenses`,
  labels: (groupId: string) => `/api/groups/${groupId}/labels`
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
  expensesByLabel: '/expenses?viewBy=byLabel',
  expensesAdd: '/expenses/add'
};

export const B4hRoutesProtected = [B4hRoutes.groups, B4hRoutes.labels, B4hRoutes.expenses];
