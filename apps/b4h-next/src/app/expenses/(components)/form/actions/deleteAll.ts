'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { deleteExpensesFirebase, getExpensesByParentFirebase } from '@b4h/firestore';
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
    const childrens = await getExpensesByParentFirebase(userId, groupId, parentId);
    const childrensIds = childrens.map(expense => expense.id);
    const ids = [parentId, ...childrensIds];

    await deleteExpensesFirebase(userId, groupId, ids);

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
