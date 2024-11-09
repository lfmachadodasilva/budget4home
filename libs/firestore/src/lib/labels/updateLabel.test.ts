import { GroupModel, LabelModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_INVALID_USER_ID, TEST_LABEL_NAME, TEST_USER_ID } from '../testConstants';
import { addLabelFirestore } from './addLabel';
import { getLabelFirestore } from './getLabel';
import { updateLabelFirestore } from './updateLabel';

describe('updateLabelFirestore', () => {
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: 'group1',
      userIds: [TEST_USER_ID]
    });
  });

  test('should update label', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });

    // act
    await updateLabelFirestore(TEST_USER_ID, group?.id as string, {
      id: label?.id,
      name: TEST_LABEL_NAME + 'updated',
      icon: '💣',
      keys: 'key3,key4'
    });

    // arrage
    const value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME + 'updated');
    expect(value?.icon).toBe('💣');
    expect(value?.keys).toBe('key3,key4');
  });

  test('should fail if user does not belong to the group', async () => {
    // act & assert
    expect(
      async () =>
        await updateLabelFirestore(
          TEST_INVALID_USER_ID,
          group?.id as string,
          {} as Partial<LabelModel>
        )
    ).rejects.toThrow();
  });

  test('should not update if label id does not exist', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });

    // act
    await updateLabelFirestore(TEST_USER_ID, group?.id as string, {
      id: 'invalid',
      name: TEST_LABEL_NAME + 'updated',
      icon: '💣',
      keys: 'key3,key4'
    });

    // assert
    const value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME);
    expect(value?.icon).toBe('🏷️');
    expect(value?.keys).toBe('key1,key2');
  });
});
