import { GroupModel, LabelModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_INVALID_USER_ID, TEST_LABEL_NAME, TEST_USER_ID } from '../testConstants';
import { addLabelFirestore } from './addLabel';
import { getLabelFirestore } from './getLabel';

describe('getLabelFirestore', () => {
  let group: GroupModel | undefined;
  let label: LabelModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: 'group1',
      userIds: [TEST_USER_ID]
    });
    label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });
  });

  test('should retrieve label for the given user and group', async () => {
    const value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);

    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME);
    expect(value?.icon).toBe('🏷️');
    expect(value?.keys).toBe('key1,key2');
  });

  test('should fail if user does not belong to the group', async () => {
    // act & assert
    expect(
      async () =>
        await getLabelFirestore(TEST_INVALID_USER_ID, group?.id as string, label?.id as string)
    ).rejects.toThrow();
  });

  test('should return undefined or null if label does not exist', async () => {
    const value = await getLabelFirestore(TEST_USER_ID, group?.id as string, 'invalid');

    expect(value).toBeUndefined();
  });
});
