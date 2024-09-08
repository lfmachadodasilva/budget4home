import { ExpenseModel, LabelModel } from '@b4h/models';
import { Link } from 'react-router-dom';
import { expensesByDate } from '../../../shared/expenseUtil';
import { formatValue } from '../../../shared/formatValue';
import { labelsById } from '../../../shared/labelUtil';
import { B4hRoutes } from '../../../shared/routes';
import styles from '../expensesPage.module.scss';

export interface ViewByDateProps {
  expenses: ExpenseModel[];
  labels: LabelModel[];
}

export const ViewByDate = ({ expenses, labels }: ViewByDateProps) => {
  const labelById = labelsById(labels);
  const expensesByDateId = expensesByDate(expenses);

  return Object.entries(expensesByDateId).map(([key, expenses]) => (
    <div key="viewByDate">
      <div key={`${key}_header`} className={styles.itemHeader}>
        <p className={styles.itemTitle}>{key}</p>
        <p className={styles.itemTitle}>
          {formatValue(expenses?.reduce((acc, expense) => acc + expense.value, 0))}
        </p>
      </div>

      <div key={`${key}_items`} className={styles.items}>
        {expenses?.map(expense => (
          <Link to={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
            <div className={styles.item}>
              <p>
                {labelById[expense.label as string]?.icon} {expense.name}
              </p>
              <p>{formatValue(expense.value)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ));
};
