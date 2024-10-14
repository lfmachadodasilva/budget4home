import { FETCH_GROUPS, SESSION } from '@/utils/constants';
import { GroupModel } from '@b4h/models';
import { cookies } from 'next/headers';

const baseUrl = (process.env['NEXT_PUBLIC_API_URL'] as string) ?? 'http://localhost:3000/api';
export const fetchGroups = async () => {
  const session = cookies().get(SESSION)?.value || '';

  const res = await fetch(baseUrl + '/groups', {
    method: 'GET',
    headers: {
      session: session
    },
    next: {
      revalidate: 3600,
      tags: [FETCH_GROUPS]
    }
  });

  return (await res.json()) as GroupModel[];
};
