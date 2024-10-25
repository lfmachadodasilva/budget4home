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
  const { getUserId, getFavoriteGroupId: getGroupId } = b4hSession();
  const userId = getUserId();
  const groupId = await getGroupId();

  try {
    const expenseId = data.id;
    if (!expenseId) {
      throw new Error('delete action: invalid expense id');
    }
    await deleteExpenseFirebase(userId, groupId, expenseId);
    // revalidatePath(B4hRoutes.expenses, 'page');

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
