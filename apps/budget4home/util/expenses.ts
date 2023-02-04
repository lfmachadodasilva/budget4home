import { Expense, Label } from '@budget4home/base';
import { format } from 'date-fns';
import { groupBy, mean, meanBy, orderBy, sumBy } from 'lodash';

export const expensesToJson = (expenses: Expense[], labels: Label[]) => {
  var groups = groupBy(expenses, function (expense) {
    return expense.label.id;
  });
  var objs = Object.keys(groups).map(labelId => {
    return {
      ...labels.find(x => x.id === labelId),
      expenses: Array.from(groups[labelId])
    };
  });

  return JSON.stringify(objs, null, 2);
};

export const expensesByLabel = (expenses: Expense[], operation: 'sum' | 'avg') => {
  var groupsByLabel = groupBy(expenses, function (expense) {
    return expense.label.id;
  });

  const byLabels = Object.keys(groupsByLabel).map(labelId => {
    if (groupsByLabel[labelId].length <= 0) {
      return {};
    }

    let total: number;
    if (operation === 'avg') {
      // calculate average per month
      const groupByMonth = groupBy(groupsByLabel[labelId], expense => {
        return format(new Date(expense.date), 'yyyy-MM');
      });
      total = mean(
        Object.values(groupByMonth).map(expenses => {
          return sumBy(expenses, expense => expense.value);
        })
      );
    } else {
      total = sumBy(groupsByLabel[labelId], x => x.value);
    }

    return {
      labelId,
      label: groupsByLabel[labelId].at(0).label,
      expenses: groupsByLabel[labelId],
      total
    };
  });

  return orderBy(byLabels, ['total'], ['asc']);
};

export const expensesByDay = (expenses: Expense[], operation: 'sum' | 'avg') => {
  var byDay = groupBy(expenses, function (expense) {
    return new Date(expense.date).getDate();
  });

  const obj = Object.keys(byDay).map(day => {
    if (byDay[day].length <= 0) {
      return {};
    }

    return {
      date: byDay[day].at(0).date,
      label: byDay[day].at(0).label,
      expenses: byDay[day],
      total:
        operation === 'sum' ? sumBy(byDay[day], x => x.value) : meanBy(byDay[day], x => x.value)
    };
  });

  return orderBy(obj, ['date'], ['desc']);
};
