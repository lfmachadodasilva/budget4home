export const FirestoreCollections = {
  groups: "/budget4home",
  group: (groupId: string) => `budget4home/${groupId}`,
  labels: (groupId: string) => `budget4home/${groupId}/labels`,
  label: (groupId: string, labelId: string) =>
    `budget4home/${groupId}/labels/${labelId}`,
  expeses: (groupId: string) => `budget4home/${groupId}/expenses`,
  expese: (groupId: string, expenseId: string) =>
    `budget4home/${groupId}/expenses/${expenseId}`,
};
