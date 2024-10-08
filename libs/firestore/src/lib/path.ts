const root = 'budget4home';
const labels = 'labels';
const expenses = 'expenses';

export const FirestorePath = {
  groups: `/${root}`,
  group: (groupId: string) => `/${root}/${groupId}`,
  labels: (groupId: string) => `/${root}/${groupId}/${labels}`,
  label: (groupId: string, labelId: string) => `/${root}/${groupId}/${labels}/${labelId}`,
  expeses: (groupId: string) => `/${root}/${groupId}/${expenses}`,
  expese: (groupId: string, expenseId: string) => `/${root}/${groupId}/${expenses}/${expenseId}`
};
