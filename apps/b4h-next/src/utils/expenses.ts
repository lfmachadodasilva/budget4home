import { ExpenseModel } from '@b4h/models';
import { format } from 'date-fns';

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

export const formatValue = (value: number) => {
  return (value / 100).toFixed(2).replace(/[.,]00$/, '');
};
