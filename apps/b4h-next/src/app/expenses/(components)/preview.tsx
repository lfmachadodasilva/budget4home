import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import { ACTION_DONE, ACTION_SUBMIT, ANIMATION_DELAY } from '@/utils/constants';
import { expensesByDate, formatValue } from '@/utils/expenses';
import { labelsById } from '@/utils/label';
import { B4hRoutes } from '@/utils/routes';
import { ExpenseModel, LabelModel } from '@b4h/models';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { onSubmitAllAction } from './form/action';

export interface B4hExpensePreviewProps {
  labels: LabelModel[];
  expenses: ExpenseModel[];
}

export const B4hExpensePreview = ({ expenses, labels }: B4hExpensePreviewProps) => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<string | null>(null);
  const [state, formAction] = useFormState(onSubmitAllAction, {
    message: ''
  });

  const onSubmit = () => {
    setIsLoading(ACTION_SUBMIT);
    formAction(expenses);
  };

  useEffect(() => {
    setIsLoading(null);
    if (state.message === ACTION_DONE) {
      push(B4hRoutes.expenses);
    }
  }, [state, push]);

  if (expenses.length === 0) {
    return null;
  }

  // format data
  const labelById = labelsById(labels);
  const expenseBy = expensesByDate(expenses);
  let item = 1;

  return (
    <div style={{ marginTop: 'var(--size-l)' }}>
      {Object.entries(expenseBy).map(([key, expenses]) => (
        <B4hItem.Group key={key}>
          <B4hFade key={key + 'animation'} delay={item++ * ANIMATION_DELAY}>
            <B4hItem.GroupTitle>
              <p>{key}</p>
              <p>{formatValue(expenses.reduce((acc, expense) => acc + expense.value, 0))}</p>
            </B4hItem.GroupTitle>
          </B4hFade>

          <B4hItem.Items>
            {expenses.map(expense => (
              <B4hFade key={item + 'animation'} delay={item++ * ANIMATION_DELAY}>
                <B4hItem.Item key={expense.id}>
                  <p>
                    {labelById[expense.label]?.icon} {expense.name}
                  </p>
                  <p>{formatValue(expense.value)}</p>
                </B4hItem.Item>
              </B4hFade>
            ))}
          </B4hItem.Items>
        </B4hItem.Group>
      ))}
      <B4hButton type="submit" widthFit onClick={onSubmit} loading={isLoading === ACTION_SUBMIT}>
        add all expenses
      </B4hButton>
    </div>
  );
};
