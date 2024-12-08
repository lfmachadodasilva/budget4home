'use client';

import { SHOW_DETAILS } from '@/utils/constants';
import { formatValue } from '@/utils/expenses';
import { ExpenseModel, ExpenseType } from '@b4h/models';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';
import { sum } from 'lodash';
import { useEffect, useState } from 'react';
import styles from './summary.module.scss';

export interface B4hExpenseSummary {
  expenses: ExpenseModel[];
}

export const B4hExpenseSummary = ({ expenses }: B4hExpenseSummary) => {
  const [showDetails, setShowDetails] = useState(true);

  useEffect(() => {
    if (localStorage.getItem(SHOW_DETAILS) === 'true') {
      setShowDetails(true);
    } else {
      setShowDetails(false);
    }
  }, []);

  const handleToggleDetails = () => {
    setShowDetails(value => {
      const newValue = !value;
      localStorage.setItem(SHOW_DETAILS, newValue.toString());
      return newValue;
    });
  };

  const totalOutcoming = sum(
    expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)
  );
  const totalIncoming = sum(
    expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)
  );
  const totalLeft = totalIncoming - totalOutcoming;
  const percentage = (totalLeft / totalIncoming) * 100 * 100;

  return (
    <div className={styles.container1}>
      <div className={styles.container2}>
        <p>
          <small>Total used:</small>{' '}
          <span data-testid="total-used">{formatValue(totalOutcoming, showDetails)}</span>
        </p>
        <p>
          <small>Total left:</small>{' '}
          <span data-testid="total-left">{formatValue(totalLeft, showDetails)}</span>{' '}
          {totalIncoming > 0 && (
            <small className={percentage < 0 ? styles.negative : ''} data-testid="total-perc">
              {formatValue(percentage, showDetails)}%
            </small>
          )}
        </p>
      </div>
      {showDetails && <EyeOpenIcon style={{ cursor: 'pointer' }} onClick={handleToggleDetails} />}
      {!showDetails && (
        <EyeClosedIcon style={{ cursor: 'pointer' }} onClick={handleToggleDetails} />
      )}
    </div>
  );
};
