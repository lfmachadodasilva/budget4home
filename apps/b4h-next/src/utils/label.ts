import { LabelModel } from '@b4h/models';

export const labelsById = (labels: LabelModel[]) => {
  const labelsById = {
    ...labels.reduce(
      (acc, label) => {
        acc[label.id] = label;
        return acc;
      },
      {} as Record<string, LabelModel>
    )
  };
  return labelsById;
};

export const selectLabelByExpenseName = (labels: LabelModel[], name: string) => {
  const lowerCaseName = name.trim().toLowerCase();
  for (const label of labels.filter(label => label.keys)) {
    const keys = label.keys?.split(',').map(key => key.trim().toLowerCase());
    for (const key of keys ?? []) {
      if (lowerCaseName.includes(key)) {
        return label;
      }
    }
  }
};
