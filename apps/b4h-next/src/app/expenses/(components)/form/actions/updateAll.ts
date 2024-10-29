'use server';

import { ACTION_DONE, ACTION_FAIL, FETCH_EXPENSES } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import {
  getExpenseFirebase,
  getExpensesByParentFirebase,
  updateExpensesFirebase
} from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { revalidatePath, revalidateTag } from 'next/cache';
import { ExpenseFormType } from '../schema';

export async function onUpdateAllAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  revalidatePath(B4hRoutes.expenses, 'page');

  try {
    const parentId = data.parent ?? data.id;
    if (!parentId) {
      throw new Error('update all action: invalid parent id');
    }
    const [parent, childrens] = await Promise.all([
      getExpenseFirebase(userId, groupId, parentId),
      getExpensesByParentFirebase(userId, groupId, parentId)
    ]);
    const expenses = [parent, ...childrens]
      .filter(expense => !!expense)
      .map(expense => {
        revalidateTag(FETCH_EXPENSES(expense?.date));
        return {
          name: data.name,
          value: data.value,
          label: data.label,
          id: expense?.id
        } as ExpenseModel;
      });

    await updateExpensesFirebase(userId, groupId, expenses);
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
