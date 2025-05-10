import { ExpenseModel, ExpenseType, LabelModel } from '@b4h/models';
import { format } from 'date-fns';
import { isEmpty, isNull, omitBy, sumBy } from 'lodash';
import { DATE_FORMAT } from './constants';

export type B4hExpenseHeaderType = {
  month: string;
  year: string;
  viewBy: string;
};

export const expenseQueryParams = (props: B4hExpenseHeaderType) =>
  props.month || props.year || props.viewBy
    ? '?' + new URLSearchParams(omitBy(props, x => isEmpty(x) || isNull(x))).toString()
    : '';

export const expensesByDate = (expenses: ExpenseModel[]): Record<string, ExpenseModel[]> => {
  return expenses.reduce(
    (acc, expense) => {
      const date = format(expense.date, DATE_FORMAT);
      acc[date] = acc[date] || [];
      acc[date].push(expense);
      return acc;
    },
    {} as Record<string, ExpenseModel[]>
  );
};

export const expensesByLabel = (
  expenses: ExpenseModel[],
  labels: Record<string, LabelModel>
): Record<string, ExpenseModel[]> => {
  const labelsById = {
    ...(expenses ?? []).reduce(
      (acc, expense) => {
        const label = labels[expense.label];
        const labelTitle = `${label.icon} ${label.name}`;
        acc[labelTitle] = acc[labelTitle] || [];
        acc[labelTitle].push(expense);
        return acc;
      },
      {} as Record<string, ExpenseModel[]>
    )
  };
  return Object.fromEntries(
    Object.entries(labelsById ?? {}).sort(
      ([, a], [, b]) => sumBy(a, c => c.value) - sumBy(b, c => c.value)
    )
  );
};

export const formatValue = (
  value: number,
  showValue: boolean | null | undefined = null
): string => {
  if (showValue === true) {
    return '****';
  }
  return (value / 100).toFixed(2).replace(/[.,]00$/, '');
};

export const formatValues = (
  expenses: ExpenseModel[],
  showValue: boolean | null | undefined = null
): string => {
  if (showValue === true) {
    return '****';
  }
  const inconing = sumBy(
    expenses.filter(expense => expense.type === ExpenseType.incoming),
    ex => ex.value
  );
  const outcoming = sumBy(
    expenses.filter(expense => expense.type === ExpenseType.outcoming),
    ex => ex.value
  );

  const resultIncoming = inconing > 0 ? `+${formatValue(inconing)} ` : '';
  const resultOutcoming = outcoming > 0 ? `-${formatValue(outcoming)} ` : '0';

  return `${resultIncoming}${resultOutcoming}`.trim();
};

export const getDateFromQuery = (year?: string | null, month?: string | null): Date => {
  if ((year && isNaN(Number(year))) || (month && isNaN(Number(month)))) {
    throw new Error('getDateFromQuery: Invalid date');
  }

  const date = new Date();
  date.setDate(1);
  year && year.length > 0 && date.setFullYear(Number(year));
  month && month.length > 0 && date.setMonth(Number(month) - 1);

  return date;
};
