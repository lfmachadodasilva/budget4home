import { Expense, Label } from '@budget4home/base';
import { groupBy } from 'lodash';

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
