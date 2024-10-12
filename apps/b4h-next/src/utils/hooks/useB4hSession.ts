import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SESSION_GROUP_ID, SESSION_USER_ID } from '../constants';
import { B4hRoutes } from '../routes';

export const useB4hSession = () => {
  const userId = cookies().get(SESSION_USER_ID)?.value as string;
  if (!userId) {
    redirect(B4hRoutes.login);
  }

  const groupId = cookies().get(SESSION_GROUP_ID)?.value as string;

  return { userId: userId, groupId: groupId };
};
