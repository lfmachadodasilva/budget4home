import { Expense, ExpenseType, Label } from '@budget4home/base';
import { format, isToday, isYesterday } from 'date-fns';
import { groupBy, sum } from 'lodash';
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
    var groupsByLabel = groupBy(props.expenses, function (expense) {
      return expense.label.id;
    });

    return (
      <>
        {Object.keys(groupsByLabel)
          .reverse()
          .map(labelId => {
            if (groupsByLabel[labelId].length <= 0) {
              return <></>;
            }

            const total = sum(groupsByLabel[labelId].map(x => x.value));
            return (
              <div key={labelId}>
                <HeaderByLabel label={groupsByLabel[labelId].at(0).label} total={total} />
                {groupsByLabel[labelId].map(expense => (
                  <ExpenseItem
                    groupId={props.groupId}
                    expense={expense}
                    key={expense.id}
                    viewBy={props.viewBy}
                  />
                ))}
              </div>
            );
          })}
      </>
    );
  }

  var groups = groupBy(props.expenses, function (expense) {
    return new Date(expense.date).getDate();
  });
  const date = new Date(props.expenses.at(0)?.date ?? new Date());
  return (
    <>
      {Object.keys(groups)
        .reverse()
        .map(day => {
          const total = sum(
            groups[day].filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
          );
          return (
            <div key={day}>
              <Header date={date} day={+day} total={total} />
              {groups[day].map(expense => (
                <ExpenseItem groupId={props.groupId} expense={expense} key={expense.id} />
              ))}
            </div>
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
