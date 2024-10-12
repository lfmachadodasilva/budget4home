import { getGroupsFirestore } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_GROUP_ID, SESSION_USER_ID } from '../constants';
import { B4hRoutes } from '../routes';

let groups: GroupModel[];

export const useB4hSession = () => {
  const userId = cookies().get(SESSION_USER_ID)?.value as string;
  if (!userId) {
    redirect(B4hRoutes.login);
  }

  const getGroupId = async () => {
    if (!groups) {
      groups = await getGroupsFirestore(userId);
    }
    let groupId = cookies().get(SESSION_GROUP_ID)?.value as string;
    if (groups.find(g => g.id === groupId)) {
      return groupId;
    }

    groupId = groups[0]?.id;
    if (!groupId) {
      redirect(B4hRoutes.groups);
    }

    cookies().set({
      name: SESSION_GROUP_ID,
      value: groupId,
      maxAge: 60 * 60 * 24 * 5 * 1000,
      httpOnly: true,
      secure: true
    });
    return groupId;
  };

  return { userId: userId, getGroupId: getGroupId };
};
