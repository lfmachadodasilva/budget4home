import { B4hRoutes } from '@/shared/routes';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const useB4hSession = () => {
  const userId = cookies().get('session-user-id')?.value as string;
  if (!userId) {
    redirect(B4hRoutes.login);
  }
  return { userId: userId };
};
