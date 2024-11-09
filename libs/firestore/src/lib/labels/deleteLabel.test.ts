import { GroupModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import {
  TEST_GROUP_NAME,
  TEST_INVALID_USER_ID,
  TEST_LABEL_NAME,
  TEST_USER_ID
} from '../testConstants';
import { addLabelFirestore } from './addLabel';
import { deleteLabelFirestore } from './deleteLabel';
import { getLabelFirestore } from './getLabel';

describe('deleteLabelFirestore', () => {
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });
    expect(group).toBeDefined();
  });

  test('should add and then delete a label', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME
    });
    expect(label).toBeDefined();

    // act
    await deleteLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);

    // assert
    const deletedLabel = await getLabelFirestore(
      TEST_USER_ID,
      group?.id as string,
      label?.id as string
    );
    expect(deletedLabel).toBeUndefined();
  });

  test('should fail if user does not belong to the group', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME
    });
    expect(label).toBeDefined();

    // act & assert
    expect(
      async () =>
        await deleteLabelFirestore(TEST_INVALID_USER_ID, group?.id as string, label?.id as string)
    ).rejects.toThrow();
  });
});
