import { BASE_URL } from '@/utils/config';
import { FETCH_EXPENSES, SESSION } from '@/utils/constants';
import { B4hApiRoutes } from '@/utils/routes';
import { ExpenseModel } from '@b4h/models';
import { cookies } from 'next/headers';

export const fetchExpenses = async (
  groupId: string,
  month: string | undefined | null = null,
  year: string | undefined | null = null
) => {
  const cookie = await cookies();
  const session = cookie.get(SESSION)?.value || '';

  const query =
    month || year
      ? new URLSearchParams({
          month: month?.toString() ?? '',
          year: year?.toString() ?? ''
        }).toString()
      : '';

  const res = await fetch(new URL(B4hApiRoutes.expenses(groupId) + query, BASE_URL), {
    method: 'GET',
    headers: {
      session: session
    },
    cache: 'force-cache',
    next: {
      // revalidate: 900, // 15 minutes
      tags: [FETCH_EXPENSES]
    }
  });

  if (res.ok) {
    return (await res.json()) as ExpenseModel[];
  }
  return null;
};
