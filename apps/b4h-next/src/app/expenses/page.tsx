import { getExpensesFirebase, getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import Link from 'next/link';
import { B4hButton } from '../../components/ui/button/button';
import { B4hItem } from '../../components/ui/item/item';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import {
  B4hExpenseHeaderType,
  expensesByDate,
  expensesByLabel,
  formatValue,
  getDateFromQuery
} from '../../utils/expenses';
import { useB4hSession } from '../../utils/hooks/useB4hSession';
import { labelsById } from '../../utils/label';
import { B4hRoutes } from '../../utils/routes';
import { B4hExpensesHeader } from './header';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function Expeses({ searchParams }: { searchParams: B4hExpenseHeaderType }) {
  const date = getDateFromQuery(searchParams);
  const { userId } = useB4hSession();

  // fetch data
  const groups = await getGroupsFirestore(userId);
  const [labels, expenses] = await Promise.all([
    getLabelsFirestore(userId, groups[0].id),
    getExpensesFirebase(userId, groups[0].id, date)
  ]);

  // format data
  const labelById = labelsById(labels);
  const expenseBy =
    searchParams.viewBy === 'byLabel'
      ? expensesByLabel(expenses, labelById)
      : expensesByDate(expenses);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        <B4hExpensesHeader />

        <B4hItem.Root>
          {Object.entries(expenseBy).map(([key, expenses]) => (
            <B4hItem.Group key={key}>
              <B4hItem.GroupTitle>
                <p>{key}</p>
                <p>{formatValue(expenses.reduce((acc, expense) => acc + expense.value, 0))}</p>
              </B4hItem.GroupTitle>

              <B4hItem.Items>
                {expenses.map(expense => (
                  <Link href={`${B4hRoutes.expenses}/${expense.id}`} key={expense.id}>
                    <B4hItem.Item>
                      <p>
                        {labelById[expense.label]?.icon} {expense.name}
                      </p>
                      <p>{formatValue(expense.value)}</p>
                    </B4hItem.Item>
                  </Link>
                ))}
              </B4hItem.Items>
            </B4hItem.Group>
          ))}
        </B4hItem.Root>
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
