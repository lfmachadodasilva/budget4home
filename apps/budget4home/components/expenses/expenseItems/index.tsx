import { Expense, Label } from '@budget4home/base';
import { format, isToday, isYesterday } from 'date-fns';
import { expensesByDay, expensesByLabel } from '../../../util/expenses';
import { formatValue } from '../../../util/util';
import { ExpenseItem } from '../../item/expense';

import styles from './index.module.scss';

interface ExpenseItemProps {
  groupId: string;
  expenses: Expense[];
  viewBy?: string;
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  if (props.viewBy === 'label') {
    const byLabel = expensesByLabel(props.expenses, 'sum');
    const toReturn = byLabel.map(obj => {
      return (
        <div key={obj.labelId}>
          <HeaderByLabel label={obj.label} total={obj.total} />
          {obj.expenses.map(expense => (
            <ExpenseItem
              groupId={props.groupId}
              expense={expense}
              key={expense.id}
              viewBy={props.viewBy}
            />
          ))}
        </div>
      );
    });
    return <>{toReturn}</>;
  }

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

interface HeaderByLabelProps {
  label: Label;
  total: number;
}
const HeaderByLabel = (props: HeaderByLabelProps) => {
  return (
    <div className={styles.header} key={`header-${props.label.id}`}>
      {props.label.icon && <label>{props.label.icon}</label>}
      <label>
        <strong>{props.label.name}</strong>
      </label>
      <label>
        <strong>{formatValue(props.total)}</strong>
      </label>
    </div>
  );
};
