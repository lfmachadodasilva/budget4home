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
        <label className={styles.expense}>
          {props.expense.label?.icon ?? props.expense.label?.name}
        </label>
        <label className={styles.expense}>{props.expense.name}</label>
        {props.expense.scheduled && (
          <label className={styles.expense}>{props.expense.scheduled}</label>
        )}
        <label
          className={props.expense.type === ExpenseType.incoming ? styles.incoming : styles.expense}
        >
          {formatValue(props.expense.value)}
        </label>
      </div>
    </a>
  );
};
