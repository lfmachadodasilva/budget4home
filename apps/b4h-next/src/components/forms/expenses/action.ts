'use server';

import { expenseFormSchema, ExpenseFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: ExpenseFormType
): Promise<FormState> {
  console.log(data);
  const parsed = expenseFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  // const { userId } = useB4hSession();

  // TODO write to Firestore
  // const expense: Partial<ExpenseModel> = data;
  // console.log({ expense });

  return { message: 'Expense registered' };
}
