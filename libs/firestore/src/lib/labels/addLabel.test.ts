import { GroupModel } from '@b4h/models';
import { isSameDay } from 'date-fns';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_GROUP_NAME, TEST_LABEL_NAME, TEST_USER_ID } from '../testConstants';
import { addLabelFirestore } from './addLabel';

describe('addLabelFirestore', () => {
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });
  });

  test('should add a label to the group successfully', async () => {
    // act
    const value = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });

    // assert
    expect(value?.id).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME);
    expect(value?.icon).toBe('🏷️');
    expect(value?.keys).toBe('key1,key2');

    expect(isSameDay(value?.createdAt as Date, new Date())).toBeTruthy();
    expect(isSameDay(value?.updatedAt as Date, new Date())).toBeTruthy();

    expect(value?.createdBy).toBe(TEST_USER_ID);
    expect(value?.updatedBy).toBe(TEST_USER_ID);
  });
});
