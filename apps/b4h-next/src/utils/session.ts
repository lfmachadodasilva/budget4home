import { fetchGroups } from '@/clients/groups';
import { SESSION_GROUP_ID, SESSION_USER_ID } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const b4hSession = () => {
  const getUserId = async () => {
    const cookie = await cookies();
    const userId = cookie.get(SESSION_USER_ID)?.value as string;
    return userId;
  };

  async function getFavoriteGroupId() {
    const [cookie, groups] = await Promise.all([cookies(), fetchGroups()]);

    const userId = cookie.get(SESSION_USER_ID)?.value as string;

    if (!groups) {
      redirect(B4hRoutes.home);
    }

    let groupId = cookie.get(SESSION_GROUP_ID)?.value as string;
    if (groups?.find(g => g.id === groupId)) {
      return {
        groupId,
        userId
      };
    }

    groupId = groups[0]?.id;

    if (!groupId) {
      console.warn('getFavoriteGroupId: groups is empty');
    }

    return {
      groupId,
      userId
    };
  }

  return {
    getUserId,
    getFavoriteGroupId
  };
};
