import { ExpenseModel, LabelModel } from '@b4h/models';
import { B4hButton } from '@b4h/web-components';
import { format } from 'date-fns';
import { Link, useSearchParams } from 'react-router-dom';
import { B4hLoading } from '../../components/loading/loading';
import { useB4hExpeses } from '../../providers/expensesProvider';
import { useB4hLabels } from '../../providers/labelsProvider';
import { expensesByDate, expensesByLabel } from '../../shared/expenseUtil';
import { formatValue } from '../../shared/formatValue';
import { labelsById } from '../../shared/labelUtil';
import { B4hRoutes } from '../../shared/routes';
import styles from './expensesPage.module.scss';
import { B4hMonthPicker } from './monthPicker/monthPicker';
import { B4hViewBy } from './viewBy/viewBy';

export const ExpensesPage = () => {
  const [searchParams] = useSearchParams();
  const { query: labelsQuery } = useB4hLabels();
  const { query: expensesQuery } = useB4hExpeses();

  const date = new Date();
  date.setDate(1);
  // searchParams.year && date.setFullYear(+searchParams?.year);
  // searchParams.month && date.setMonth(+searchParams?.month - 1);

  // const groupId = await getGroupId(userId);
  // const [expenses, labels] = await Promise.all([
  //   getExpenses(groupId, userId, date),
  //   getLabels(groupId, userId)
  // ]);

  const expenses = expensesQuery?.data as ExpenseModel[];
  const labels = labelsQuery?.data as LabelModel[];

  if (!expenses || !labels) {
    return <B4hLoading />;
  }

  const viewBy = searchParams.get('viewBy') ?? 'byDate';

  const labelById = labelsById(labels);
  const expenseBy =
    viewBy === 'byLabel' ? expensesByLabel(expenses, labelById) : expensesByDate(expenses);

  return (
    <>
      <title>home | expenses</title>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1>expenses</h1>
          <Link to={B4hRoutes.expensesAdd}>
            <B4hButton>add</B4hButton>
          </Link>
        </div>

        <B4hMonthPicker
          className={styles.monthPicker}
          type="month"
          defaultValue={format(date, 'yyyy-MM')}
          widthFit
        />

        <B4hViewBy className={styles.viewBy} defaultValue={viewBy} widthFit />

        {Object.entries(expenseBy).map(([key, expenses]) => (
          <>
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
                      {viewBy === 'byDate' && labelById[expense.label as string]?.icon}{' '}
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
    </>
  );
};
