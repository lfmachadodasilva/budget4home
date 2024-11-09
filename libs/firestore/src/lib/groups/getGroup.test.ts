import { addGroupFirestore } from '../groups/addGroup';
import { TEST_GROUP_NAME, TEST_USER_ID } from '../testConstants';
import { getGroupFirestore } from './getGroup';

describe('getGroupFirestore', () => {
  test('should retrieve group', async () => {
    const group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });

    const value = await getGroupFirestore(TEST_USER_ID, group?.id as string);

    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_GROUP_NAME);
    expect(value?.userIds).toStrictEqual([TEST_USER_ID]);
  });
});
