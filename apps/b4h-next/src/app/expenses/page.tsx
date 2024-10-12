import Link from 'next/link';
import { B4hButton } from '../../components/ui/button/button';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import { B4hRoutes } from '../../utils/routes';
import { expensesByDate, formatValue } from '../../utils/expenses';

import { B4hForm } from '../../components/ui/form/form';
import { format } from 'date-fns';
import { labelsById } from '../../utils/label';

import { B4hItem } from '../../components/ui/item/item';
import { getExpensesFirebase, getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import { useB4hSession } from '../../utils/hooks/useB4hSession';
import { MONTH_FORMAT } from '../../utils/constants';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function Expeses() {
  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const labels = await getLabelsFirestore(userId, groups[0].id);
  const expenses = await getExpensesFirebase(userId, groups[0].id);

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
          <B4hForm.Input type="month" defaultValue={format(new Date(), MONTH_FORMAT)} />
        </B4hForm.Field>

        <B4hForm.Field>
          <B4hForm.Label>view by</B4hForm.Label>
          <B4hForm.Select>
            <B4hForm.Option value="month">month</B4hForm.Option>
            <B4hForm.Option value="year">year</B4hForm.Option>
          </B4hForm.Select>
        </B4hForm.Field>

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
