import { GroupModel, LabelModel } from '@b4h/models';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_INVALID_USER_ID, TEST_LABEL_NAME, TEST_USER_ID } from '../testConstants';
import { addLabelFirestore } from './addLabel';
import { getLabelFirestore } from './getLabel';
import { updateLabelsFirebase } from './updateLabels';

describe('updateLabelsFirestore', () => {
  let group: GroupModel | undefined;

  beforeAll(async () => {
    group = await addGroupFirestore(TEST_USER_ID, {
      name: 'group1',
      userIds: [TEST_USER_ID]
    });
  });

  test('should update label', async () => {
    // arrange
    const label1 = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });
    const label2 = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key3,key4'
    });

    // act
    await updateLabelsFirebase(TEST_USER_ID, group?.id as string, [
      {
        id: label1?.id,
        name: TEST_LABEL_NAME + 'updated1',
        icon: '💣',
        keys: 'key5,key6'
      },
      {
        id: label2?.id,
        name: TEST_LABEL_NAME + 'updated2',
        icon: '✅',
        keys: 'key7,key8'
      }
    ]);

    // assert
    let value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label1?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME + 'updated1');
    expect(value?.icon).toBe('💣');
    expect(value?.keys).toBe('key5,key6');

    value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label2?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME + 'updated2');
    expect(value?.icon).toBe('✅');
    expect(value?.keys).toBe('key7,key8');
  });

  test('should fail if user does not belong to the group', async () => {
    // act & assert
    expect(
      async () =>
        await updateLabelsFirebase(TEST_INVALID_USER_ID, group?.id as string, [
          {} as Partial<LabelModel>
        ])
    ).rejects.toThrow();
  });

  test('should not update if the label does not exist', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME,
      icon: '🏷️',
      keys: 'key1,key2'
    });

    // act
    await updateLabelsFirebase(TEST_USER_ID, group?.id as string, [
      {
        id: 'invalid',
        name: TEST_LABEL_NAME + 'updated1',
        icon: '💣',
        keys: 'key5,key6'
      }
    ]);

    // assert
    const value = await getLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);
    expect(value).toBeDefined();
    expect(value?.name).toBe(TEST_LABEL_NAME);
    expect(value?.icon).toBe('🏷️');
    expect(value?.keys).toBe('key1,key2');
  });
});
