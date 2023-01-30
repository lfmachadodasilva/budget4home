import { Expense, ExpenseType } from '@budget4home/base';
import { format, isToday, isYesterday } from 'date-fns';
import { B4hRoutes } from '../../util/routes';
import { formatValue } from '../../util/util';

import styles from './index.module.scss';

interface ExpenseItemProps {
  groupId: string;
  expense: Expense;
  viewBy?: string;
}

export const ExpenseItem = (props: ExpenseItemProps) => {
  const date = new Date(props.expense.date);
  return (
    <a
      className={styles.container}
      key={props.expense.id}
      href={`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.expenses}/${props.expense.id}`}
    >
      <div className={styles.content}>
        {props.viewBy !== 'label' && (
          <label className={styles.expense}>
            {props.expense.label?.icon ?? props.expense.label?.name}
          </label>
        )}
        {props.viewBy === 'label' && (
          <label className={styles.expense}>
            {isToday(new Date(date))
              ? 'Today'
              : isYesterday(new Date(date))
              ? 'Yesterday'
              : format(new Date(date), 'yyyy-MM-dd')}
          </label>
        )}
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
