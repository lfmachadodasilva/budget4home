import { Group } from '@budget4home/base';
import { cookies } from 'next/headers';
import { groupRepository } from './repositories';

const defaultGroupIdLabel = 'defaultGroupId';

export const getDefaultOrFirstGroup = async (userId: string) => {
  const cookieStore = cookies();

  if (!userId) {
    throw new Error('Invalid or null user id. Method: getDefaultOrFirstGroup');
  }

  const groupId = cookieStore.get(defaultGroupIdLabel)?.value;

  const group = groupId
    ? await groupRepository.get(userId, groupId)
    : await groupRepository.getFirst(userId);

  if (!group) {
    cookieStore.set(defaultGroupIdLabel, undefined);
  }
  return group;
};

export const getDefaultGroupId = (groups: Group[]) => {
  const cookie = cookies();
  const groupId = cookie.get(defaultGroupIdLabel)?.value;

  if (groupId && !groups.some(x => x.id === groupId)) {
    cookie.set(defaultGroupIdLabel, undefined);
  }

  return groupId;
};
