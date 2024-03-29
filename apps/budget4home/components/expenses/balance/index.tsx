import { Expense, ExpenseType } from '@budget4home/base';
import { sum } from 'lodash';
import { getUserId } from '../../../util/getUserId';
import { expenseRepository } from '../../../util/repositories';
import { formatValue } from '../../../util/util';

import styles from './index.module.scss';

export interface BalanceProps {
  groupId: string;
  expenses?: Expense[];
}

export const Balance = async (props: BalanceProps) => {
  const userId = await getUserId();

  const date = new Date();
  let expenses: Expense[] = [];

  if (!props.expenses) {
    expenses = await expenseRepository.getThisMonth(userId, props.groupId, date);
  } else {
    expenses = props.expenses;
  }

  const totalOutcoming = sum(
    expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
  );
  const totalIncoming = sum(
    expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)
  );
  const totalLeft = totalIncoming - totalOutcoming;

  return (
    <div className={styles.container}>
      <p>
        <strong>Total used:</strong> {formatValue(totalOutcoming)}
      </p>
      <p className={totalLeft <= 0 ? 'error' : ''}>
        <strong>Total left:</strong> {formatValue(totalLeft)}
        {totalIncoming > 0 && (
          <small>{formatValue((totalLeft / totalIncoming) * 100 * 100)}%</small>
        )}
      </p>
    </div>
  );
};
