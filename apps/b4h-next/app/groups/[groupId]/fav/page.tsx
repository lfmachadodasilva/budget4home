'use server';

import { setGroupId } from '@/shared/groupId';
import { B4hRoutes } from '@/shared/routes';
import { redirect } from 'next/navigation';

export default async function GroupFavPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params;

  setGroupId(groupId);

  redirect(B4hRoutes.groups);
}
