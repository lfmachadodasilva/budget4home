'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import {
  addExpenseFirebase,
  addExpensesFirebase,
  deleteExpenseFirebase,
  updateExpenseFirebase
} from '@b4h/firestore';
import { addMonths } from 'date-fns';
import { expenseFormSchema, ExpenseFormType, expenseTypeToModel } from './schema';

export async function onSubmitAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getUserUid, getFavoriteGroupId } = b4hSession();
  const userId = getUserUid();
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const groupId = await getFavoriteGroupId();
    const expense = expenseTypeToModel(data);

    if (expense.id) {
      await updateExpenseFirebase(userId, groupId, expense);
    } else {
      const parent = await addExpenseFirebase(userId, groupId, expense);

      if (parent) {
        if (expense.scheduled) {
          const expenses = Array.from(Array(data.scheduled - 1).keys()).map((_, index) => {
            return {
              ...expenseTypeToModel(data),
              parent: parent.id,
              scheduled: `${index + 2}/${data.scheduled}`,
              data: addMonths(parent.date, index + 1)
            };
          });
          await addExpensesFirebase(userId, groupId, expenses);
        }
      } else {
        throw new Error('expense submit action: fail to add expense');
      }
    }

    // revalidatePath(B4hRoutes.expenses, 'page');

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
  const { getUserUid, getFavoriteGroupId: getGroupId } = b4hSession();
  const userId = getUserUid();
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
