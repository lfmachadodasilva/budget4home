import { GroupModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_INVALID_USER_ID, TEST_USER_ID } from '../testConstants';
import { addLabelFirestore } from './addLabel';
import { getLabelsFirestore } from './getLabels';

describe('getLabelsFirestore', () => {
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: 'group1',
      userIds: [TEST_USER_ID]
    });
    await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: 'label 1'
    });
    await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: 'label 2'
    });
  });

  test('should retrieve all labels for the given user and group', async () => {
    const values = await getLabelsFirestore(TEST_USER_ID, group?.id as string);

    expect(values.length).toBe(2);
    expect(values[0].name).toBe('label 1');
    expect(values[1].name).toBe('label 2');
  });

  test('should fail if user does not belong to the group', async () => {
    // act & assert
    expect(
      async () => await getLabelsFirestore(TEST_INVALID_USER_ID, group?.id as string)
    ).rejects.toThrow();
  });
});
