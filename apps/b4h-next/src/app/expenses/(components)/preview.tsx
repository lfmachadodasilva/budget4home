import { B4hButton } from '@/components/ui/button/button';
import { B4hItem } from '@/components/ui/item/item';
import { ACTION_DONE } from '@/utils/constants';
import { expensesByDate, formatValue } from '@/utils/expenses';
import { labelsById } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { ExpenseModel, LabelModel } from '@b4h/models';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState } from 'react-dom';
import { onSubmitAllAction } from './form/action';

export interface B4hExpensePreviewProps {
  labels: LabelModel[];
  expenses: ExpenseModel[];
}

export const B4hExpensePreview = ({ expenses, labels }: B4hExpensePreviewProps) => {
  if (expenses.length === 0) {
    return null;
  }

  const { push } = useRouter();
  const [state, formAction] = useFormState(onSubmitAllAction, {
    message: ''
  });
  const onSubmit = () => {
    formAction(expenses);
  };

  useEffect(() => {
    if (state.message === ACTION_DONE) {
      push(B4hRoutes.expenses);
    }
  }, [state, push]);

  // format data
  const labelById = labelsById(labels);
  const expenseBy = expensesByDate(expenses);

  return (
    <div style={{ marginTop: 'var(--size-l)' }}>
      {Object.entries(expenseBy).map(([key, expenses]) => (
        <B4hItem.Group key={key}>
          <B4hItem.GroupTitle>
            <p>{key}</p>
            <p>{formatValue(expenses.reduce((acc, expense) => acc + expense.value, 0))}</p>
          </B4hItem.GroupTitle>

          <B4hItem.Items>
            {expenses.map(expense => (
              <B4hItem.Item>
                <p>
                  {labelById[expense.label]?.icon} {expense.name}
                </p>
                <p>{formatValue(expense.value)}</p>
              </B4hItem.Item>
            ))}
          </B4hItem.Items>
        </B4hItem.Group>
      ))}
      <B4hButton type="submit" widthFit onClick={onSubmit}>
        add all expenses
      </B4hButton>
    </div>
  );
};
