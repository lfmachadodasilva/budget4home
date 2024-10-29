'use server';

import { ACTION_DONE, ACTION_FAIL, FETCH_EXPENSES } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { deleteExpenseFirebase, getExpenseFirebase } from '@b4h/firestore';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ExpenseFormType } from '../schema';

export async function onDeleteAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  try {
    const expenseId = data.id;
    if (!expenseId) {
      throw new Error('delete action: invalid expense id');
    }

    revalidatePath(B4hRoutes.expenses, 'page');

    const expense = await getExpenseFirebase(userId, groupId, expenseId);
    revalidateTag(FETCH_EXPENSES(expense?.date));
    await deleteExpenseFirebase(userId, groupId, expenseId);
  } catch (err) {
    console.error(err);
    return {
      message: ACTION_FAIL
    } as FormState;
  }

  return {
    message: ACTION_DONE
  } as FormState;
}
