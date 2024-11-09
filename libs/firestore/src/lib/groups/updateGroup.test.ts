import { addGroupFirestore } from '../groups/addGroup';
import { TEST_GROUP_NAME, TEST_USER_ID } from '../testConstants';
import { getGroupFirestore } from './getGroup';
import { updateGroupFirestore } from './updateGroup';

describe('updateGroupFirestore', () => {
  test('should update group if is valid', async () => {
    // arrange
    const group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });

    // act
    await updateGroupFirestore(TEST_USER_ID, {
      id: group?.id,
      name: 'updated',
      userIds: [TEST_USER_ID, 'anotherUserId']
    });

    // assert
    const value = await getGroupFirestore(TEST_USER_ID, group?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe('updated');
    expect(value?.userIds).toStrictEqual([TEST_USER_ID, 'anotherUserId']);
  });
});
