import { GroupModel } from '@b4h/models';
import { getGroupsFirestore } from '../groups/getGroups';
import { TEST_GROUP_NAME, TEST_USER_ID } from '../testConstants';
import { addGroupFirestore } from './addGroup';

describe('getGroupsFirestore', () => {
  let group1: GroupModel | undefined;
  let group2: GroupModel | undefined;

  beforeAll(async () => {
    group1 = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });
    expect(group1).toBeDefined();
    group2 = await addGroupFirestore('anotherUserId', {
      name: TEST_GROUP_NAME + '2',
      userIds: ['anotherUserId']
    });
    expect(group2).toBeDefined();
  });

  test('should get group that belongs to this user', async () => {
    // act
    const groups = await getGroupsFirestore(TEST_USER_ID);

    // assert
    expect(groups.length).toBeGreaterThan(0);
    expect(groups[0]?.name).toBe(TEST_GROUP_NAME);
    expect(groups[0]?.userIds).toStrictEqual([TEST_USER_ID]);
  });

  test('should get empty if this user does not have any groups', async () => {
    // act
    const groups = await getGroupsFirestore('invalid');

    // assert
    expect(groups.length).toBe(0);
  });
});
