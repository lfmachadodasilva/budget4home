'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { deleteExpenseFirebase } from '@b4h/firestore';
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

    // const expense = await getExpenseFirebase(userId, groupId, expenseId);
    // revalidateTag(FETCH_EXPENSES(expense?.date));
    // revalidatePath(B4hRoutes.expenses, 'page');

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
