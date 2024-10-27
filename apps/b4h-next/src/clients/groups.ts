import { FETCH_GROUPS, FETCH_REVALIDATE_TIME, SESSION } from '@/utils/constants';
import { B4hApiRoutes } from '@/utils/routes';
import { GroupModel } from '@b4h/models';
import { cookies } from 'next/headers';

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000';
export const fetchGroups = async (): Promise<GroupModel[] | null> => {
  const cookie = await cookies();
  const session = cookie.get(SESSION)?.value || '';

  const res = await fetch(new URL(B4hApiRoutes.groups, baseUrl), {
    method: 'GET',
    headers: {
      session: session
    },
    next: {
      revalidate: FETCH_REVALIDATE_TIME,
      tags: [FETCH_GROUPS]
    }
  });

  if (res.ok) {
    return (await res.json()) as GroupModel[];
  }
  return null;
};
