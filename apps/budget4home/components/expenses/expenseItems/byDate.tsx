import { Expense } from '@budget4home/base';
import { format, isToday, isYesterday } from 'date-fns';
import { expensesByDay } from '../../../util/expenses';
import { formatValue } from '../../../util/util';
import { ExpenseItem } from '../../item/expense';

import styles from './index.module.scss';

export interface ExpensesByDate {
  expenses: Expense[];
  groupId: string;
}

export const ExpensesByDate = (props: ExpensesByDate) => {
  const byDay = expensesByDay(props.expenses, 'sum');
  const toReturn = byDay.map(obj => {
    const date = new Date(obj.date);
    return (
      <div key={obj.date}>
        <Header date={date} day={date.getDate()} total={obj.total} />
        {obj.expenses.map(expense => (
          <ExpenseItem groupId={props.groupId} expense={expense} key={expense.id} />
        ))}
      </div>
    );
  });
  return <>{toReturn}</>;
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
    <div className={styles.header} key={`${date.toISOString()}`}>
      <label>
        <strong>
          {isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'yyyy-MM-dd')}
        </strong>
      </label>
      <label>
        <strong>{formatValue(props.total)}</strong>
      </label>
    </div>
  );
};
