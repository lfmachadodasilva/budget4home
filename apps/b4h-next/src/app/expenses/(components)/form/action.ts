'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { useB4hSession } from '@/utils/hooks/useB4hSession';
import { addExpenseFirebase, deleteExpenseFirebase, updateExpenseFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { expenseFormSchema, ExpenseFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { userId, getGroupId } = useB4hSession();
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const groupId = await getGroupId();
    const expense: Partial<ExpenseModel> = data;
    if (expense.id) {
      updateExpenseFirebase(userId, groupId, expense);
    } else {
      addExpenseFirebase(userId, groupId, expense);
    }
    return {
      message: ACTION_DONE
    };
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
}

export async function onDeleteAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { userId, getGroupId } = useB4hSession();
  const groupId = await getGroupId();

  try {
    const expense: Partial<ExpenseModel> = data;
    await deleteExpenseFirebase(userId, groupId, expense.id as string);

    return {
      message: ACTION_DONE
    } as FormState;
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }
}
