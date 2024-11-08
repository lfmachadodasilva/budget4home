import { GroupModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { addLabelFirestore } from './addLabel';

describe('addLabelFirestore', () => {
  const userId = 'userId1';
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(userId, {
      name: 'group1',
      userIds: [userId]
    });
  });

  test('addLabelFirestore', async () => {
    const value = await addLabelFirestore(userId, group?.id as string, {
      name: 'name'
    });

    expect(value?.name).toBe('name');
  });
});
