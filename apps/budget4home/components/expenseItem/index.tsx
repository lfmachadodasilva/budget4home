import { Expense, ExpenseType } from '@budget4home/base';
import { B4hRoutes } from '../../util/routes';
import { formatValue } from '../../util/util';

import styles from './index.module.scss';

interface ExpenseItemProps {
  groupId: string;
  expense: Expense;
}

export const ExpenseItem = (props: ExpenseItemProps) => {
  return (
    <a
      className={styles.container}
      key={props.expense.id}
      href={`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}/${props.expense.id}`}
    >
      <div className={styles.content}>
        <label>{props.expense.label?.icon ?? props.expense.label?.name}</label>
        <label>{props.expense.name}</label>
        {props.expense.scheduled && (
          <label>
            <small>{props.expense.scheduled}</small>
          </label>
        )}
        <label className={props.expense.type === ExpenseType.incoming ? styles.incoming : ''}>
          <strong>{formatValue(props.expense.value)}</strong>
        </label>
      </div>
    </a>
  );
};
