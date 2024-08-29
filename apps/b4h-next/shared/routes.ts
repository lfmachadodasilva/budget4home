export const B4hApiRoutes = {
  login: '/api/auth/login'
};

export const B4hRoutes = {
  home: '/',

  login: '/login',
  logout: '/logout',
  register: '/register',
  forgot: '/forgot',

  groups: '/groups',
  labels: '/labels',
  expenses: '/expenses'
};

export const B4hRoutesProtected = [B4hRoutes.groups, B4hRoutes.labels, B4hRoutes.expenses];
