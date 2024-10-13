'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { b4hSession } from '@/utils/session';
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
  const { userId, getFavoriteGroupId } = b4hSession();
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const groupId = await getFavoriteGroupId();
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
  const { userId, getFavoriteGroupId: getGroupId } = b4hSession();
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

export async function onSubmitAllAction(
  prevState: FormState,
  data: ExpenseFormType[]
): Promise<FormState> {
  const { userId, getFavoriteGroupId: getGroupId } = b4hSession();
  const groupId = await getGroupId();

  try {
    const promises = data.map(async expense => {
      await addExpenseFirebase(userId, groupId, expense);
    });
    await Promise.all(promises);

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
