'use server';
import 'server-only';

import { fetchGroups } from '@/clients/groups';
import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FETCH_GROUPS, SESSION_GROUP_ID } from './constants';

const setGroupCookieServer = async (groupId?: string | null) => {
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

export const setFavoriteGroupIdSession = async (groupId: string | null | undefined) => {
  const groups = await fetchGroups();
  if (!groups) {
    throw new Error('setFavoriteGroupId: groups not found');
  }

  if (!groupId || groupId === '') {
    cookies().delete(SESSION_GROUP_ID);

    groupId = groups[0]?.id;
  }

  if (!groups.find(g => g.id === groupId)) {
    console.error('setFavoriteGroupId: group not found in cache');
    groupId = null;
  }

  const currentGroupId = cookies().get(SESSION_GROUP_ID)?.value as string;
  if (groupId && currentGroupId !== groupId) {
    await setGroupCookieServer(groupId);
  }

  return groupId;
};

export const cleanGroupsCache = async () => {
  revalidateTag(FETCH_GROUPS);
};