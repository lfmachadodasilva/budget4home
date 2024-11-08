import { getFirebaseAdminFirestore } from '@b4h/firebase-admin';
import { ExpenseModel } from '@b4h/models';
import { tryGroupIsValidFirestore } from '../groups/validateGroup';
import { FirestorePath } from '../path';
import { expenseConverter } from './converter';

export const deleteExpensesFirebase = async (
  userId: string,
  groupId: string,
  expenseIds: string[]
) => {
  await tryGroupIsValidFirestore(userId, groupId);

  const batch = getFirebaseAdminFirestore().batch();

  expenseIds.forEach(id => {
    if (id) {
      const doc = getFirebaseAdminFirestore().doc(FirestorePath.expese(groupId, id));
      batch.delete(doc);
    }
  });

  await batch.commit();
};

export const deleteExpensesByLabelFirebase = async (
  userId: string,
  groupId: string,
  labelId: string
) => {
  await tryGroupIsValidFirestore(userId, groupId);
  const query = getFirebaseAdminFirestore()
    .collection(FirestorePath.expeses(groupId))
    .where('label', '==', labelId)
    .withConverter(expenseConverter)
    .limit(10);

  return new Promise((resolve, reject) => {
    deleteQueryBatch(query, resolve).catch(reject);
  });
};

async function deleteQueryBatch(
  query: FirebaseFirestore.Query<ExpenseModel, FirebaseFirestore.DocumentData>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (value?: any) => void
) {
  const snapshot = await query.get();

  const batchSize = snapshot.size;
  if (batchSize === 0) {
    // When there are no documents left, we are done
    resolve();
    return;
  }

  // Delete documents in a batch
  const batch = getFirebaseAdminFirestore().batch();
  snapshot.docs.forEach(doc => {
    batch.delete(doc.ref);
  });
  await batch.commit();

  // Recurse on the next process tick, to avoid
  // exploding the stack.
  process.nextTick(() => {
    deleteQueryBatch(query, resolve);
  });
}
