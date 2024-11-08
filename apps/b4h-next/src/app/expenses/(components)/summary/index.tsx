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
        <small>Total used:</small>{' '}
        <span data-testid="total-used">{formatValue(totalOutcoming)}</span>
      </p>
      <p>
        <small>Total left:</small> <span data-testid="total-left">{formatValue(totalLeft)}</span>{' '}
        {totalIncoming > 0 && (
          <small className={percentage < 0 ? styles.negative : ''} data-testid="total-perc">
            {formatValue(percentage)}%
          </small>
        )}
      </p>
    </div>
  );
};
