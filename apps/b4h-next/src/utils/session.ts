import { fetchGroups } from '@/clients/groups';
import { FETCH_GROUPS, SESSION_GROUP_ID, SESSION_USER_ID } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const setGroupCookieServer = async (groupId?: string | null) => {
  'use server';

  if (!groupId) {
    cookies().delete(SESSION_GROUP_ID);
    return;
  }

  cookies().set({
    name: SESSION_GROUP_ID,
    value: groupId,
    // maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
    secure: true
  });
};

export const b4hSession = () => {
  const getUserUid = () => {
    const userId = cookies().get(SESSION_USER_ID)?.value as string;
    return userId;
  };

  async function getFavoriteGroupId() {
    const groups = await fetchGroups();

    let groupId = cookies().get(SESSION_GROUP_ID)?.value as string;
    if (groups.find(g => g.id === groupId)) {
      return groupId;
    }

    groupId = groups[0]?.id;

    await setGroupCookieServer(groupId);

    if (!groupId) {
      console.warn('first group not found in cache');
      redirect(B4hRoutes.groupsAdd);
    }

    return groupId;
  }

  const setFavoriteGroupId = async (groupId: string | null | undefined) => {
    const groups = await fetchGroups();

    if (!groupId || groupId === '') {
      cookies().delete(SESSION_GROUP_ID);

      groupId = groups[0]?.id;
    }

    if (!groups.find(g => g.id === groupId)) {
      console.error('group not found in cache');
      groupId = null;
    }

    await setGroupCookieServer(groupId);

    return groupId;
  };

  const cleanGroupsCache = async () => {
    'use server';
    revalidateTag(FETCH_GROUPS);
  };

  return {
    getUserUid: getUserUid,
    getFavoriteGroupId: getFavoriteGroupId,
    cleanGroupsCache: cleanGroupsCache,
    setFavoriteGroupId: setFavoriteGroupId
  };
};
