import { B4hMonthPicker } from '@/components/monthPicker/monthPicker';
import { useB4hSession } from '@/hooks/useB4hSession';
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
  searchParams: { month: string; year: string };
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

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </div>

      {/* <B4hInput
        onClick={handleOnMonthPicker}
        className={styles.monthPicker}
        type="month"
        defaultValue={format(new Date(), 'yyyy-MM')}
      /> */}

      <B4hMonthPicker
        className={styles.monthPicker}
        type="month"
        defaultValue={format(new Date(), 'yyyy-MM')}
      />

      {expenses.map(expense => (
        <Link href={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
          <div className={styles.item}>
            <p className={styles.itemTxt}>{format(expense.date, 'yyyy/MM/dd')}</p>
            <p className={styles.itemTxt}>
              {labelById[expense.label as string]?.icon} {expense.name}
            </p>
            <p className={styles.itemTxt}>{expense.value}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
