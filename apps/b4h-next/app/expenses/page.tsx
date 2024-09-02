import { B4hMonthPicker } from '@/components/monthPicker/monthPicker';
import { B4hViewBy, B4hViewByType } from '@/components/viewBy/viewBy';
import { useB4hSession } from '@/hooks/useB4hSession';
import { expensesByDate, expensesByLabel } from '@/shared/expenseUtil';
import { formatValue } from '@/shared/formatValue';
import { getGroupId } from '@/shared/groupId';
import { labelsById } from '@/shared/labelUtil';
import { B4hRoutes } from '@/shared/routes';
import { getExpenses, getLabels } from '@b4h/firestore';
import { B4hButton } from '@b4h/web-components';
import { format } from 'date-fns';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function ExpensesPage({
  searchParams
}: {
  searchParams: { month: string; year: string; viewBy: string };
}) {
  const { userId } = useB4hSession();

  const date = new Date();
  date.setDate(1);
  searchParams.year && date.setFullYear(+searchParams?.year);
  searchParams.month && date.setMonth(+searchParams?.month - 1);

  const groupId = await getGroupId(userId);
  const [expenses, labels] = await Promise.all([
    getExpenses(groupId, userId, date),
    getLabels(groupId, userId)
  ]);

  const labelById = labelsById(labels);
  const expenseBy =
    searchParams.viewBy === 'byLabel'
      ? expensesByLabel(expenses, labelById)
      : expensesByDate(expenses);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </div>

      <B4hMonthPicker
        className={styles.monthPicker}
        type="month"
        defaultValue={format(date, 'yyyy-MM')}
        widthFit
      />
      <B4hViewBy className={styles.viewBy} defaultValue={searchParams.viewBy} widthFit />

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
                    {searchParams.viewBy === B4hViewByType.byDate &&
                      labelById[expense.label as string]?.icon}{' '}
                    {expense.name}
                  </p>
                  <p>{formatValue(expense.value)}</p>
                </div>
              </Link>
            ))}
          </div>
        </>
      ))}
    </div>
  );
}
