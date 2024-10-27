import { LabelModel } from '@b4h/models';

export const labelsById = (labels: LabelModel[]) =>
  labels.reduce(
    (acc, label) => {
      acc[label.id] = label;
      return acc;
    },
    {} as Record<string, LabelModel>
  );

export const labelsByKey = (labels: LabelModel[]) =>
  labels.reduce(
    (acc, label) => {
      const keys = label.keys?.split(',').map(key => key.trim());
      if (keys) {
        for (const key of keys) {
          acc[key] = label;
        }
      }
      return acc;
    },
    {} as Record<string, LabelModel>
  );

export const selectLabelByExpenseName = (labels: LabelModel[], name: string) => {
  const lowerCaseName = name.trim().toLowerCase();
  for (const label of labels.filter(label => label.keys)) {
    const keys = label.keys?.split(',').map(key => key.trim().toLowerCase());
    for (const key of keys ?? []) {
      if (lowerCaseName.indexOf(key) >= 0) {
        return label;
      }
    }
  }
};
