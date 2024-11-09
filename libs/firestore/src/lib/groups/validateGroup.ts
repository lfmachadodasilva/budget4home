import { getGroupFirestore } from './getGroup';

export const tryGroupIsValidFirestore = async (userId: string, groupId: string) => {
  const group = await getGroupFirestore(userId, groupId);
  if (!group) {
    console.error('tryGroupIsValidFirestore: Group not found');
    throw new Error('Not authorized');
  }
  return group;
};
