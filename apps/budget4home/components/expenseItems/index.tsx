import { Expense, ExpenseType } from '@budget4home/base';
import { format, isToday, isYesterday } from 'date-fns';
import { groupBy, sum } from 'lodash';
import { formatValue } from '../../util/util';
import { ExpenseItem } from '../expenseItem';

import styles from './index.module.scss';

interface ExpenseItemProps {
  groupId: string;
  expenses: Expense[];
}

export const ExpenseItems = (props: ExpenseItemProps) => {
  var groups = groupBy(props.expenses, function (expense) {
    return new Date(expense.date).getDate();
  });
  const date = new Date(props.expenses.at(0)?.date ?? new Date());

  // return <>tmp</>;

  return (
    <>
      {Object.keys(groups)
        .reverse()
        .map(day => {
          const total = sum(
            groups[day].filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
          );
          return (
            <>
              <Header date={date} day={+day} total={total} />
              {groups[day].map(expense => (
                <ExpenseItem groupId={props.groupId} expense={expense} />
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
    <div className={styles.header} key={`${date.toISOString()}`}>
      <label>
        <strong>
          <small>
            {isToday(date) ? 'Today' : isYesterday(date) ? 'Yesterday' : format(date, 'yyyy-MM-dd')}
          </small>
        </strong>
      </label>
      <label>
        <strong>
          <small>{formatValue(props.total)}</small>
        </strong>
      </label>
    </div>
  );
};
