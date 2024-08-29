const home = 'budget4home';
const labels = 'labels';
const expenses = 'expenses';

export const FirestorePath = {
  groups: `/${home}`,
  group: (groupId: string) => `/${home}/${groupId}`,
  labels: (groupId: string) => `/${home}/${groupId}/${labels}`,
  label: (groupId: string, labelId: string) => `/${home}/${groupId}/${labels}/${labelId}`,
  expeses: (groupId: string) => `/${home}/${groupId}/${expenses}`,
  expese: (groupId: string, expenseId: string) => `/${home}/${groupId}/${expenses}/${expenseId}`
};
