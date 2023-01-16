'use client';

import { Expense, ExpenseType } from '@budget4home/base';
import { useRouter } from 'next/navigation';
import { B4hRoutes } from '../../util/routes';
import { formatValue } from '../../util/util';

import styles from './index.module.scss';

interface ExpenseItemProps {
  expense: Expense;
}

export const ExpenseItem = (props: ExpenseItemProps) => {
  const { push } = useRouter();

  const handleOnAction = () => {
    push(`${B4hRoutes.groups}/${props.expense.groupId}${B4hRoutes.expenses}/${props.expense.id}`);
  };

  return (
    <div className={styles.container} onClick={handleOnAction}>
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
    </div>
  );
};
