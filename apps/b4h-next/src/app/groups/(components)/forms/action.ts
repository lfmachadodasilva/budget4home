'use server';

import { addGroupFirestore, updateGroupFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { redirect } from 'next/navigation';
import { useB4hSession } from '../../../../utils/hooks/useB4hSession';
import { B4hRoutes } from '../../../../utils/routes';
import { groupFormSchema, GroupFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: GroupFormType
): Promise<FormState> {
  const { userId } = useB4hSession();

  const parsed = groupFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  const group: Partial<GroupModel> = data;
  if (group.id) {
    updateGroupFirestore(userId, group);
  } else {
    addGroupFirestore(userId, group);
  }
  redirect(B4hRoutes.groups);
}
