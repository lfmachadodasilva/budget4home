'use server';

import { ACTION_DONE, ACTION_FAIL } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { addExpenseFirebase, addExpensesFirebase } from '@b4h/firestore';
import { ExpenseModel } from '@b4h/models';
import { groupBy } from 'lodash';

export async function onSubmitAllAction(
  prevState: FormState,
  data: ExpenseModel[]
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();
  const { userId, groupId } = await getFavoriteGroupId();

  try {
    const expensesGroupById = groupBy(data, expense => expense.id);
    const expensesEntries = Object.entries(expensesGroupById);
    const newExpensesPromises = expensesEntries.map(async ([key, value]) => {
      if (key === `${undefined}` || key === `${null}`) {
        // single entry
        return value;
      }

      // scheduled expenses
      const parentId = value.findIndex(x => !x.parent);
      if (parentId < 0) {
        throw new Error('not found parent');
      }
      // remove parent from value list
      const parentToAdd = value.splice(parentId, 1)[0];
      // add parent to populate parent id in the children
      const parentAdded = await addExpenseFirebase(userId, groupId, parentToAdd);
      if (!parentAdded) {
        throw new Error('expense not added');
      }
      // populate parent id in the children
      return value.map(x => {
        return { ...x, parent: parentAdded.id } as ExpenseModel;
      });
    });
    const expenses = (await Promise.all(newExpensesPromises)).flat().filter(x => x);

    await addExpensesFirebase(userId, groupId, expenses);
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
