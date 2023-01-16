'use client';

import { Expense, ExpenseType } from '@budget4home/base';
import { format } from 'date-fns';
import { groupBy, sum } from 'lodash';
import { ExpenseItem } from '../expenseItem';

import styles from './index.module.scss';

interface ExpenseItemProps {
  expenses: Expense[];
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  var groups = groupBy(props.expenses, function (expense) {
    return new Date(expense.date).getDate();
  });

  const date = new Date(props.expenses.at(0)?.date ?? new Date());

  return (
    <>
      {Object.keys(groups).map(day => {
        const total = sum(
          groups[day].filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
        );
        return (
          <>
            <Header date={date} day={+day} total={total} />
            {groups[day].map(expense => (
              <ExpenseItem expense={expense} />
            ))}
          </>
        );
      })}
    </>
  );
};

interface HeaderProps {
  date: Date;
  day: number;
  total: number;
}
const Header = (props: HeaderProps) => {
  const date = props.date;
  date.setDate(props.day);

  return (
    <div className={styles.header}>
      <label>
        <strong>
          <small>{format(date, 'yyyy-MM-dd')}</small>
        </strong>
      </label>
      <label>
        <strong>
          <small>{(props.total / 100).toFixed(2)}</small>
        </strong>
      </label>
    </div>
  );
};
