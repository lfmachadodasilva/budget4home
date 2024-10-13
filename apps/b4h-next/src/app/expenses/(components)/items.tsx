import { getExpensesFirebase, getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import Link from 'next/link';
import { B4hItem } from '../../../components/ui/item/item';
import {
  B4hExpenseHeaderType,
  expensesByDate,
  expensesByLabel,
  formatValue,
  getDateFromQuery
} from '../../../utils/expenses';
import { useB4hSession } from '../../../utils/hooks/useB4hSession';
import { labelsById } from '../../../utils/label';
import { B4hRoutes } from '../../../utils/routes';

export const B4hExpensesItems = async (props: B4hExpenseHeaderType) => {
  const { userId } = useB4hSession();
  const date = getDateFromQuery(props.year, props.month);

  // fetch data
  const groups = await getGroupsFirestore(userId);
  const [labels, expenses] = await Promise.all([
    getLabelsFirestore(userId, groups[0].id),
    getExpensesFirebase(userId, groups[0].id, date)
  ]);

  // format data
  const labelById = labelsById(labels);
  const expenseBy =
    props.viewBy === 'byLabel' ? expensesByLabel(expenses, labelById) : expensesByDate(expenses);

  return Object.entries(expenseBy).map(([key, expenses]) => (
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
  ));
};
