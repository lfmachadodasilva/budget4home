export const B4hRoutes = {
  home: '/',
  login: '/login',
  register: '/register',
  reset: '/reset',

  groups: '/groups',
  labels: '/labels',
  expenses: '/expenses'
};

export const B4hApiRoutes = {
  labels: (groupId: string) => process.env.API_URL + `/api/groups/${groupId}/labels`,
  label: (groupId: string, labelId: string) =>
    process.env.API_URL + `/api/groups/${groupId}/labels/${labelId}`
};
