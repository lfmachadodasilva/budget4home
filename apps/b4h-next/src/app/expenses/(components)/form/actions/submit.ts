'use server';

import { ACTION_DONE, ACTION_FAIL, ACTION_INVALID, FETCH_EXPENSES } from '@/utils/constants';
import { FormState } from '@/utils/formState';
import { b4hSession } from '@/utils/session';
import { addExpenseFirebase, addExpensesFirebase, updateExpenseFirebase } from '@b4h/firestore';
import { addMonths } from 'date-fns';
import { revalidateTag } from 'next/cache';
import { expenseFormSchema, ExpenseFormType, expenseTypeToModel } from '../schema';

export async function onSubmitAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  const { getFavoriteGroupId } = b4hSession();

  const { userId, groupId } = await getFavoriteGroupId();
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: ACTION_INVALID,
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  try {
    const expense = expenseTypeToModel(data);

    if (expense.id) {
      revalidateTag(FETCH_EXPENSES(expense.date));
      await updateExpenseFirebase(userId, groupId, expense);
    } else {
      const parent = await addExpenseFirebase(userId, groupId, expense);

      if (parent) {
        if (expense.scheduled) {
          revalidateTag(FETCH_EXPENSES(parent.date));

          const expenses = Array.from(Array(data.scheduled - 1).keys()).map((_, index) => {
            const date = addMonths(parent.date, index + 1);
            revalidateTag(FETCH_EXPENSES(date));

            return {
              ...expenseTypeToModel(data),
              parent: parent.id,
              scheduled: `${index + 2}/${data.scheduled}`,
              date: addMonths(parent.date, index + 1)
            };
          });
          await addExpensesFirebase(userId, groupId, expenses);
        }
      } else {
        throw new Error('expense submit action: fail to add expense');
      }
    }
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
