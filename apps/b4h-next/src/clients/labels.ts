import { BASE_URL } from '@/utils/config';
import { FETCH_LABELS, FETCH_REVALIDATE_TIME, SESSION } from '@/utils/constants';
import { B4hApiRoutes } from '@/utils/routes';
import { LabelModel } from '@b4h/models';
import { cookies } from 'next/headers';

export const fetchLabels = async (groupId: string): Promise<LabelModel[] | null> => {
  const cookie = await cookies();
  const session = cookie.get(SESSION)?.value || '';

  const res = await fetch(new URL(B4hApiRoutes.labels(groupId), BASE_URL), {
    method: 'GET',
    headers: {
      session: session
    },
    cache: 'force-cache',
    next: {
      revalidate: FETCH_REVALIDATE_TIME,
      tags: [FETCH_LABELS]
    }
  });

  if (res.ok) {
    return (await res.json()) as LabelModel[];
  }
  return null;
};
