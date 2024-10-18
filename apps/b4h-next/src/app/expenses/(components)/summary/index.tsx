'use server';

import { formatValue } from '@/utils/expenses';
import { ExpenseModel, ExpenseType } from '@b4h/models';
import { sum } from 'lodash';
import styles from './summary.module.scss';

export interface B4hExpenseSummary {
  expenses: ExpenseModel[];
}

export const B4hExpenseSummary = ({ expenses }: B4hExpenseSummary) => {
  const totalOutcoming = sum(
    expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
  );
  const totalIncoming = sum(
    expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)
  );
  const totalLeft = totalIncoming - totalOutcoming;
  const percentage = (totalLeft / totalIncoming) * 100 * 100;

  return (
    <div className={styles.container}>
      <p>
        <small>Total used:</small> {formatValue(totalOutcoming)}
      </p>
      <p>
        <small>Total left:</small> {formatValue(totalLeft)}{' '}
        {totalIncoming > 0 && (
          <small className={percentage < 0 ? styles.negative : ''}>
            {formatValue(percentage)}%
          </small>
        )}
      </p>
    </div>
  );
};
