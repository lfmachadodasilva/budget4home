import { Expense, Label } from '@budget4home/base';
import { expensesByLabel } from '../../../util/expenses';
import { formatValue } from '../../../util/util';
import { ExpenseItem } from '../../item/expense';

import styles from './index.module.scss';

export interface ExpensesByLabel {
  expenses: Expense[];
  groupId: string;
}

export const ExpensesByLabel = (props: ExpensesByLabel) => {
  const byLabel = expensesByLabel(props.expenses, 'sum');
  const toReturn = byLabel.map(obj => {
    return (
      <div key={obj.labelId}>
        <Header label={obj.label} total={obj.total} />
        {obj.expenses.map(expense => (
          <ExpenseItem
            groupId={props.groupId}
            expense={expense}
            key={expense.id}
            viewBy={'label'}
          />
        ))}
      </div>
    );
  });
  return <>{toReturn}</>;
};

interface HeaderProps {
  label: Label;
  total: number;
}
const Header = (props: HeaderProps) => {
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
