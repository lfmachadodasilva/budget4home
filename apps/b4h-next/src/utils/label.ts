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
