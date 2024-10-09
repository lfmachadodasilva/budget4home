'use server';

import { labelFormSchema, LabelFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const parsed = labelFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  // TODO write to Firestore

  console.log('data:', data);

  return { message: 'Label registered' };
}
