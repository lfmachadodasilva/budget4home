import { Expense, Label } from '@budget4home/base';
import { groupBy, mean, orderBy, sum } from 'lodash';

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

    return {
      labelId,
      label: groupsByLabel[labelId].at(0).label,
      expenses: groupsByLabel[labelId],
      total:
        operation === 'sum'
          ? sum(groupsByLabel[labelId].map(x => x.value))
          : mean(groupsByLabel[labelId].map(x => x.value))
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
        operation === 'sum' ? sum(byDay[day].map(x => x.value)) : mean(byDay[day].map(x => x.value))
    };
  });

  return orderBy(obj, ['date'], ['desc']);
};
