import { getExpensesFirebase, getLabelsFirestore } from '@b4h/firestore';
import Link from 'next/link';
import { B4hItem } from '../../../components/ui/item/item';
import {
  B4hExpenseHeaderType,
  expensesByDate,
  expensesByLabel,
  formatValue,
  getDateFromQuery
} from '../../../utils/expenses';
import { labelsById } from '../../../utils/label';
import { B4hRoutes } from '../../../utils/routes';
import { b4hSession } from '../../../utils/session';

export const B4hExpensesItems = async (props: B4hExpenseHeaderType) => {
  const { userId, getFavoriteGroupId } = b4hSession();
  const date = getDateFromQuery(props.year, props.month);

  // fetch data
  const groupId = await getFavoriteGroupId();
  const [labels, expenses] = await Promise.all([
    getLabelsFirestore(userId, groupId),
    getExpensesFirebase(userId, groupId, date)
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
