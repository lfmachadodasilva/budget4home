import { addExpenseFirebase } from '../expenses/addExpense';
import { getExpenseFirebase } from '../expenses/getExpense';
import { addGroupFirestore } from '../groups/addGroup';
import { deleteGroupFirestore } from '../groups/deleteGroup';
import { addLabelFirestore } from '../labels/addLabel';
import { getLabelFirestore } from '../labels/getLabel';
import { TEST_GROUP_NAME, TEST_USER_ID } from '../testConstants';
import { getGroupFirestore } from './getGroup';

describe('deleteGroupFirestore', () => {
  test('should delete a group successfully', async () => {
    // arrange
    const group = await addGroupFirestore(TEST_USER_ID, {
      name: TEST_GROUP_NAME,
      userIds: [TEST_USER_ID]
    });
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {});
    const expense = await addExpenseFirebase(TEST_USER_ID, group?.id as string, {
      value: 100,
      date: new Date()
    });

    // act
    await deleteGroupFirestore(TEST_USER_ID, group?.id as string);

    // assert
    const deletedGroup = await getGroupFirestore(TEST_USER_ID, group?.id as string);
    expect(deletedGroup).toBeNull();
    expect(
      async () => await getLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string)
    ).rejects.toThrow();
    expect(
      async () => await getExpenseFirebase(TEST_USER_ID, group?.id as string, expense?.id as string)
    ).rejects.toThrow();
  });
});
