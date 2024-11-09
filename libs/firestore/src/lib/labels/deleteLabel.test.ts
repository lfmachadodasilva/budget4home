import { ExpenseType, GroupModel } from '@b4h/models';
import { addExpenseFirebase, getExpenseFirebase } from '../expenses';
import { addGroupFirestore } from '../groups/addGroup';
import { TEST_GROUP_NAME, TEST_LABEL_NAME, TEST_USER_ID } from '../testConstants';
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

  test('should delete a label and expenses', async () => {
    // arrange
    const label = await addLabelFirestore(TEST_USER_ID, group?.id as string, {
      name: TEST_LABEL_NAME
    });
    expect(label).toBeDefined();
    const expense = await addExpenseFirebase(TEST_USER_ID, group?.id as string, {
      value: 100,
      label: label?.id,
      date: new Date(),
      type: ExpenseType.incoming
    });

    // act
    await deleteLabelFirestore(TEST_USER_ID, group?.id as string, label?.id as string);

    // assert
    const deletedLabel = await getLabelFirestore(
      TEST_USER_ID,
      group?.id as string,
      label?.id as string
    );
    expect(deletedLabel).toBeUndefined();
    const deletedExpense = await getExpenseFirebase(
      TEST_USER_ID,
      group?.id as string,
      expense?.id as string
    );
    expect(deletedExpense).toBeUndefined();
  });

  test('should fail delete a label is does not exist', async () => {
    // act
    await deleteLabelFirestore(TEST_USER_ID, group?.id as string, 'invalid');
  });
});
