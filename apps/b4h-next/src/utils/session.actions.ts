'use server';
import 'server-only';

import { cookies } from 'next/headers';
import { SESSION_GROUP_ID } from './constants';

export const setGroupCookieServer = async (groupId?: string | null) => {
  if (!groupId) {
    cookies().delete(SESSION_GROUP_ID);
    return;
  }

  cookies().set({
    name: SESSION_GROUP_ID,
    value: groupId,
    // maxAge: 60 * 60 * 24 * 5 * 1000,
    httpOnly: true,
    secure: true
  });
};
