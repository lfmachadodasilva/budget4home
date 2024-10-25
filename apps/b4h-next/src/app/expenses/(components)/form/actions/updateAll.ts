'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { getExpensesByParentFirebase, updateExpensesFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { ExpenseFormType } from '../schema';

export async function onUpdateAllAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getUserId, getFavoriteGroupId: getGroupId } = b4hSession();
  const userId = getUserId();
  const groupId = await getGroupId();

  try {
    const parentId = data.parent ?? data.id;
    if (!parentId) {
      throw new Error('update all action: invalid parent id');
    }
    const childrens = await getExpensesByParentFirebase(userId, groupId, parentId);
    const childrensIds = childrens.map(expense => expense.id);
    const ids = [parentId, ...childrensIds];

    const expenses = ids.map(id => {
      return {
        name: data.name,
        value: data.value,
        label: data.label,
        id
      } as ExpenseModel;
    });

    await updateExpensesFirebase(userId, groupId, expenses);

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
