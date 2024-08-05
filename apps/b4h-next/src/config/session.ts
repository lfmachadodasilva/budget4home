import { cookies } from 'next/headers';

export const getUserIdSession = (): string => {
  return cookies().get('session-user-id')?.value as string;
};
