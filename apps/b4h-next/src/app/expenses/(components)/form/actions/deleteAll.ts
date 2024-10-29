'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import {
  deleteExpensesFirebase,
  getExpenseFirebase,
  getExpensesByParentFirebase
} from '@b4h/firestore';
import { ExpenseFormType } from '../schema';

export async function onDeleteAllAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  try {
    const parentId = data.parent ?? data.id;
    if (!parentId) {
      throw new Error('delete all action: invalid parent id');
    }

    // revalidatePath(B4hRoutes.expenses, 'page');

    const [parent, childrens] = await Promise.all([
      getExpenseFirebase(userId, groupId, parentId),
      getExpensesByParentFirebase(userId, groupId, parentId)
    ]);
    const expenses = [parent, ...childrens];
    const ids = expenses
      .filter(expense => !!expense)
      .map(expense => {
        // revalidateTag(FETCH_EXPENSES(expense?.date));
        return expense?.id;
      });

    await deleteExpensesFirebase(userId, groupId, ids);
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
