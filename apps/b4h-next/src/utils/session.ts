import { SESSION_GROUP_ID, SESSION_USER_ID } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { getGroupsFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

let groups: GroupModel[] = [];

export const b4hSession = () => {
  const userId = cookies().get(SESSION_USER_ID)?.value as string;
  if (!userId) {
    redirect(B4hRoutes.login);
  }

  const getFavoriteGroupId = async (setCookie: boolean = true) => {
    if (groups.length === 0) {
      groups = await getGroupsFirestore(userId);
    }
    let groupId = cookies().get(SESSION_GROUP_ID)?.value as string;
    if (groups.find(g => g.id === groupId)) {
      return groupId;
    }

    groupId = groups[0]?.id;
    if (!groupId) {
      console.error('first group not found in cache');
      redirect(B4hRoutes.groups);
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

  const setFavoriteGroupId = async (groupId: string) => {
    if (groups.length === 0) {
      groups = await getGroupsFirestore(userId);
    }

    if (!groups.find(g => g.id === groupId)) {
      console.error('group not found in cache');
      return groupId;
    }

    cookies().delete(SESSION_GROUP_ID);
    cookies().set({
      name: SESSION_GROUP_ID,
      value: groupId,
      // maxAge: 60 * 60 * 24 * 5 * 1000,
      httpOnly: true,
      secure: true
    });
    return groupId;
  };

  const cleanGroupsCache = () => {
    groups = [];
  };

  return {
    userId: userId,
    getFavoriteGroupId: getFavoriteGroupId,
    cleanGroupsCache: cleanGroupsCache,
    setFavoriteGroupId: setFavoriteGroupId
  };
};
