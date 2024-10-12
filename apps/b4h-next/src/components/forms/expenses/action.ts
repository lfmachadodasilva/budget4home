'use server';

import { addExpenseFirebase, updateExpenseFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { redirect } from 'next/navigation';
import { useB4hSession } from '../../../utils/hooks/useB4hSession';
import { B4hRoutes } from '../../../utils/routes';
import { expenseFormSchema, ExpenseFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { userId, groupId } = useB4hSession();
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  const expense: Partial<ExpenseModel> = data;
  if (expense.id) {
    updateExpenseFirebase(userId, groupId, expense);
  } else {
    addExpenseFirebase(userId, groupId, expense);
  }
  redirect(B4hRoutes.expenses);
}
