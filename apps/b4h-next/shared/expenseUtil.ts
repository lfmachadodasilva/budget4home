import { ExpenseModel, LabelModel } from '@b4h/models';
import { format } from 'date-fns';
import { sumBy } from 'lodash';

export const expensesByDate = (expenses: ExpenseModel[]) => {
  const labelsById = {
    ...expenses.reduce(
      (acc, expense) => {
        const date = format(expense.date, 'yyyy/MM/dd');
        acc[date] = acc[date] || [];
        acc[date].push(expense);
        return acc;
      },
      {} as Record<string, ExpenseModel[]>
    )
  };
  return labelsById;
};

export const expensesByLabel = (expenses: ExpenseModel[], labels: Record<string, LabelModel>) => {
  const labelsById = {
    ...expenses.reduce(
      (acc, expense) => {
        const label = labels[expense.label as string];
        const labelTitle = `${label.icon} ${label.name}`;
        acc[labelTitle] = acc[labelTitle] || [];
        acc[labelTitle].push(expense);
        return acc;
      },
      {} as Record<string, ExpenseModel[]>
    )
  };
  return Object.fromEntries(
    Object.entries(labelsById).sort(
      ([, a], [, b]) => sumBy(a, c => c.value) - sumBy(b, c => c.value)
    )
  );
};
