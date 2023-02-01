import { Group } from '@budget4home/base';
import { cookies } from 'next/headers';
import { groupRepository } from './repositories';

export const getDefaultOrFirstGroup = async (userId: string) => {
  const cookie = cookies();
  const groupId = cookie.get('defaultGroupId')?.value;

  const group = groupId
    ? await groupRepository.get(userId, groupId)
    : await groupRepository.getFirst(userId);

  if (!group) {
    cookie.delete('defaultGroupId');
  }
  return group;
};

export const getDefaultGroupId = (groups: Group[]) => {
  const cookie = cookies();
  const groupId = cookie.get('defaultGroupId')?.value;

  if (groupId && !groups.some(x => x.id === groupId)) {
    cookie.delete('defaultGroupId');
  }

  return groupId;
};
