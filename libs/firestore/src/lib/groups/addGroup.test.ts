import { isSameDay } from 'date-fns';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_GROUP_NAME, TEST_USER_ID } from '../testConstants';

describe('addGroupFirestore', () => {
  test('should add a group successfully', async () => {
    // act
    const value = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });

    // assert
    expect(value?.id).toBeDefined();
    expect(value?.name).toBe(TEST_GROUP_NAME);
    expect(value?.userIds).toStrictEqual([TEST_USER_ID]);

    expect(isSameDay(value?.createdAt as Date, new Date())).toBeTruthy();
    expect(isSameDay(value?.updatedAt as Date, new Date())).toBeTruthy();

    expect(value?.createdBy).toBe(TEST_USER_ID);
    expect(value?.updatedBy).toBe(TEST_USER_ID);
  });
});
