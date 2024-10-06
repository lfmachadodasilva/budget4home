import Link from 'next/link';
import { B4hButton } from '../../components/ui/button/button';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import { B4hRoutes } from '../../utils/routes';
import { expensesByDate, formatValue } from '../../utils/expenses';

import styles from './expenses.module.scss';
import { B4hForm } from '../../components/ui/form/form';
import { format } from 'date-fns';
import { labelsById } from '../../utils/label';
import { expenses, labels } from './mock';

export default function Expeses() {
  const labelById = labelsById(labels);
  const expenseBy = expensesByDate(expenses);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        <B4hForm.Field>
          <B4hForm.Label>month</B4hForm.Label>
          <B4hForm.Input type="month" defaultValue={format(new Date(), 'yyyy-MM')} />
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label>view by</B4hForm.Label>
          <B4hForm.Select>
            <B4hForm.Option value="month">month</B4hForm.Option>
            <B4hForm.Option value="year">year</B4hForm.Option>
          </B4hForm.Select>
        </B4hForm.Field>

        {Object.entries(expenseBy).map(([key, expenses]) => (
          <>
            <div key={`${key}_header`} className={styles.itemHeader}>
              <p className={styles.itemTitle}>{key}</p>
              <p className={styles.itemTitle}>
                {formatValue(expenses.reduce((acc, expense) => acc + expense.value, 0))}
              </p>
            </div>

            <div key={`${key}_items`} className={styles.items}>
              {expenses.map(expense => (
                <Link href={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
                  <div className={styles.item}>
                    <p>
                      {labelById[expense.label]?.icon} {expense.name}
                    </p>
                    <p>{formatValue(expense.value)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ))}
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
