'use server';

import { groupFormSchema, GroupFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  // data.name = '1';
  // data.userIds = ['1', '2'];

  const parsed = groupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  // TODO write to Firestore

  console.log('data:', data);

  return { message: 'Group registered' };
}
