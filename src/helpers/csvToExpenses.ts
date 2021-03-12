import { parse } from 'date-fns';
import { ExpenseModel, ExpenseType } from '../models/expenseModel';

export const csvToExpenses = (
  data: string,
  splitByRow: string,
  splitByCol: string,
  dateFormat: string
): ExpenseModel[] => {
  let tmpExpenses: ExpenseModel[] = [];

  try {
    data.split(splitByRow).forEach(row => {
      const col = row.split(splitByCol);

      if (col.length < 5) {
        return;
      }

      tmpExpenses.push({
        id: 0,
        type: +col[0] as ExpenseType,
        name: col[1],
        value: +col[2],
        date: parse(col[3], dateFormat, new Date()),
        labelId: 0,
        labelName: col[4],
        comments: col[5],
        scheduleBy: 1,
        scheduleTotal: 1
      });
    });
  } catch {
    return [];
  }

  return tmpExpenses;
};
