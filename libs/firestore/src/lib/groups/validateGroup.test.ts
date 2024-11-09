import { addGroupFirestore } from '../groups/addGroup';
import {
  TEST_GROUP_NAME,
  TEST_INVALID_GROUP_ID,
  TEST_INVALID_USER_ID,
  TEST_USER_ID
} from '../testConstants';
import { tryGroupIsValidFirestore } from './validateGroup';

describe('tryGroupIsValidFirestore', () => {
  test('should return group if is valid', async () => {
    // arrange
    const group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });

    // act
    const value = await tryGroupIsValidFirestore(TEST_USER_ID, group?.id as string);

    // assert
    expect(value).toBeDefined();
  });

  test('should fail if group does not exist', async () => {
    // act & assert
    expect(
      async () => await tryGroupIsValidFirestore(TEST_USER_ID, TEST_INVALID_GROUP_ID)
    ).rejects.toThrow();
  });

  test('should fail if user does not belong to the group', async () => {
    // arrange
    const group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });

    // act & assert
    expect(
      async () => await tryGroupIsValidFirestore(TEST_INVALID_USER_ID, group?.id as string)
    ).rejects.toThrow();
  });
});
