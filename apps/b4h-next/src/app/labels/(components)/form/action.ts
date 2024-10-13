'use server';

import { addLabelFirestore, updateLabelFirestore } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';
import { redirect } from 'next/navigation';
import { useB4hSession } from '../../../../utils/hooks/useB4hSession';
import { B4hRoutes } from '../../../../utils/routes';
import { labelFormSchema, LabelFormType } from './schema';

export type FormState = {
  message: string;
  issues?: string[];
};

export async function onSubmitAction(
  prevState: FormState,
  data: LabelFormType
): Promise<FormState> {
  const { userId, getGroupId } = useB4hSession();
  const parsed = labelFormSchema.safeParse(data);

  if (!parsed.success) {
    return {
      message: 'Invalid form data',
      issues: [...new Set(parsed.error.issues.map(issue => issue.message))]
    };
  }

  const groupId = await getGroupId();
  const label: Partial<LabelModel> = data;
  if (label.id) {
    updateLabelFirestore(userId, groupId, label);
  } else {
    addLabelFirestore(userId, groupId, label);
  }
  redirect(B4hRoutes.labels);
}
