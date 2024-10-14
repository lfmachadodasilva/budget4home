import { SESSION_GROUP_ID, SESSION_USER_ID } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { getGroupsFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

let groupsCache: GroupModel[] = [];

const buildInMemoryCache = async (userId: string) => {
  if (groupsCache.length === 0) {
    groupsCache = await getGroupsFirestore(userId);
  }
  return groupsCache;
};
const cleanMemoryCache = () => {
  groupsCache = [];
};

export const b4hSession = () => {
  const getUserUid = () => {
    const userId = cookies().get(SESSION_USER_ID)?.value as string;
    return userId;
  };

  const getFavoriteGroupId = async (setCookie: boolean = true) => {
    const userId = getUserUid();
    const groups = await buildInMemoryCache(userId);

    let groupId = cookies().get(SESSION_GROUP_ID)?.value as string;
    if (groups.find(g => g.id === groupId)) {
      return groupId;
    }

    groupId = groups[0]?.id;

    if (!groupId) {
      console.warn('first group not found in cache');
      redirect(B4hRoutes.groupsAdd);
    }

    if (setCookie) {
      cookies().set({
        name: SESSION_GROUP_ID,
        value: groupId,
        // maxAge: 60 * 60 * 24 * 5 * 1000,
        httpOnly: true,
        secure: true
      });
    }
    return groupId;
  };

  const setFavoriteGroupId = async (groupId: string | null | undefined) => {
    const userId = getUserUid();
    const groups = await buildInMemoryCache(userId);

    if (!groupId || groupId === '') {
      cookies().delete(SESSION_GROUP_ID);

      groupId = groups[0]?.id;
    }

    if (!groups.find(g => g.id === groupId)) {
      console.error('group not found in cache');
      groupId = null;
    }

    if (groupId) {
      cookies().set({
        name: SESSION_GROUP_ID,
        value: groupId,
        // maxAge: 60 * 60 * 24 * 5 * 1000,
        httpOnly: true,
        secure: true
      });
    } else {
      cookies().delete(SESSION_GROUP_ID);
    }

    return groupId;
  };

  const cleanGroupsCache = () => {
    cleanMemoryCache();
  };

  return {
    getUserUid: getUserUid,
    getFavoriteGroupId: getFavoriteGroupId,
    cleanGroupsCache: cleanGroupsCache,
    setFavoriteGroupId: setFavoriteGroupId
  };
};
