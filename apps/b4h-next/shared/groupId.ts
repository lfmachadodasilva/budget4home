'use server';

import { getGroups } from '@b4h/firestore';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { B4hRoutes } from './routes';

const GROUP_FAV = 'group-fav';

export const getGroupId = async (userId: string) => {
  const cookiesStore = cookies();
  let groupId: string | undefined | null = cookiesStore.get(GROUP_FAV)?.value;
  if (!groupId) {
    const groups = await getGroups(userId);
    groupId = groups.length > 0 ? groups[0].id : null;
    groupId &&
      cookiesStore.set({
        name: GROUP_FAV,
        value: groupId as string,
        secure: true
      });
  }
  if (!groupId) {
    redirect(B4hRoutes.groupsAdd);
  }
  return groupId;
};

export const setGroupId = (groupId: string) => {
  const cookiesStore = cookies();
  groupId
    ? cookiesStore.set({
        name: GROUP_FAV,
        value: groupId as string,
        secure: true
      })
    : cookiesStore.delete(GROUP_FAV);
};
