import { cookies } from 'next/headers';
import { groupRepository } from './repositories';

export const getDefaultOrFirstGroup = async (userId: string) => {
  const cookie = cookies();
  const groupId = cookie.get('defaultGroupId')?.value;
  const group = groupId
    ? await groupRepository.get(userId, groupId)
    : await groupRepository.getFirst(userId);
  return group;
};

export const getDefaultGroupId = () => {
  const cookie = cookies();
  const groupId = cookie.get('defaultGroupId')?.value;
  return groupId;
};
