import { GroupModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { addLabelFirestore } from './addLabel';
import { getLabelsFirestore } from './getLabels';

describe('getLabelsFirestore', () => {
  const userId = 'userId1';
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(userId, {
      name: 'group1',
      userIds: [userId]
    });
    await addLabelFirestore(userId, group?.id as string, {
      name: 'label 1'
    });
    await addLabelFirestore(userId, group?.id as string, {
      name: 'label 2'
    });
  });

  test('getLabelsFirestore', async () => {
    const values = await getLabelsFirestore(userId, group?.id as string);

    expect(values.length).toBe(2);
    expect(values[0].name).toBe('label 1');
    expect(values[1].name).toBe('label 2');
  });
});
