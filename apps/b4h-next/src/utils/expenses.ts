import { ExpenseModel, LabelModel } from '@b4h/models';
import { format } from 'date-fns';
import { sumBy } from 'lodash';
import { DATE_FORMAT } from './constants';

export type B4hExpenseHeaderType = {
  month: string;
  year: string;
  viewBy: string;
};

export const expensesByDate = (expenses: ExpenseModel[]) => {
  const labelsById = {
    ...expenses.reduce(
      (acc, expense) => {
        const date = format(expense.date, DATE_FORMAT);
        acc[date] = acc[date] || [];
        acc[date].push(expense);
        return acc;
      },
      {} as Record<string, ExpenseModel[]>
    )
  };
  return labelsById;
};

export const formatValue = (value: number) => {
  return (value / 100).toFixed(2).replace(/[.,]00$/, '');
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

export const getDateFromQuery = (year?: string | null, month?: string | null) => {
  const date = new Date();
  date.setDate(1);
  year && year.length > 0 && date.setFullYear(Number(year));
  month && month.length > 0 && date.setMonth(Number(month) - 1);

  return date;
};
