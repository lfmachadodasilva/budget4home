import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { type Firestore } from 'firebase-admin/firestore';

import { FirestoreCollections } from '../collections';
import { GROUP, ID_MATCH, USER1 } from '../contants';
import { expenseConverter } from '../expense/expenseConverter';
import { groupConverter } from '../group/groupConverter';
import { getMockFirebase, mockExpense, mockGroup, mockLabel } from '../mock';
import { labelConverter } from './labelConverter';
import { addOrUpdateLabel, deleteLabel, getAllLabels, getLabel } from './labelRepository';

describe('label repository', () => {
  let firebaseMock: RulesTestEnvironment;
  let firestoreMock: Firestore;

  beforeAll(async () => {
    firebaseMock = await getMockFirebase('label-tests');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    firestoreMock = firebaseMock.unauthenticatedContext().firestore() as any;

    await Promise.all([
      firestoreMock
        .doc(FirestoreCollections.group(GROUP))
        .withConverter(groupConverter)
        .set(mockGroup),
      firestoreMock
        .doc(FirestoreCollections.label(GROUP, mockLabel.id))
        .withConverter(labelConverter)
        .set(mockLabel)
    ]);
  });
  afterAll(async () => {
    firebaseMock.clearFirestore();
  });

  describe('get all labels', () => {
    test('success', async () => {
      // arrange
      // act
      const models = await getAllLabels(firestoreMock, GROUP, USER1);

      // assert
      expect(models).toHaveLength(1);
    });

    test('with invalid group', async () => {
      // arrange
      // act
      const models = await getAllLabels(firestoreMock, GROUP + 'invalid', USER1 + 'invalid');

      // assert
      expect(models).toHaveLength(0);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const models = await getAllLabels(firestoreMock, GROUP, USER1 + 'invalid');

      // assert
      expect(models).toHaveLength(0);
    });
  });

  describe('get label by id', () => {
    test('success', async () => {
      // arrange
      // act
      const model = await getLabel(firestoreMock, mockLabel.id, GROUP, USER1);

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toBe(mockLabel.id);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await getLabel(firestoreMock, mockLabel.id, GROUP, USER1 + 'invalid');

      // assert
      expect(model).toBeNull();
    });

    test('with invalid group id', async () => {
      // arrange
      // act
      const model = await getLabel(firestoreMock, mockLabel.id, GROUP + 'invalid', USER1);

      // assert
      expect(model).toBeNull();
    });
  });

  describe('add label', () => {
    test('success with specific group id', async () => {
      // arrange
      // act
      const model = await addOrUpdateLabel(
        firestoreMock,
        { ...mockLabel, id: 'newLabel' },
        GROUP,
        USER1
      );

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toBe('newLabel');
      expect(model?.createdAt).toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.label(GROUP, 'newLabel'))
          .withConverter(labelConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('success with no id', async () => {
      // arrange
      // act
      const model = await addOrUpdateLabel(
        firestoreMock,
        { ...mockLabel, id: undefined },
        GROUP,
        USER1
      );

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toMatch(ID_MATCH);
      expect(model?.createdAt).toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.label(GROUP, model?.id ?? ''))
          .withConverter(labelConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await addOrUpdateLabel(
        firestoreMock,
        { ...mockLabel, id: undefined },
        GROUP,
        USER1 + 'invalid'
      );

      // assert
      expect(model).toBeNull();
    });
  });

  describe('update label', () => {
    test('success', async () => {
      // arrange
      // act
      const model = await addOrUpdateLabel(
        firestoreMock,
        { ...mockLabel, name: 'Label name updated' },
        GROUP,
        USER1
      );

      // assert
      expect(model).toBeDefined();
      expect(model?.name).toEqual('Label name updated');

      expect(model?.createdAt).not.toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.label(GROUP, model?.id ?? ''))
          .withConverter(labelConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await addOrUpdateLabel(
        firestoreMock,
        { ...mockLabel, name: 'Label 2' },
        GROUP,
        USER1 + 'invalid'
      );

      // assert
      expect(model).toBeNull();
    });
  });

  describe('delete label', () => {
    test('success', async () => {
      // arrange
      await firestoreMock
        .doc(FirestoreCollections.label(GROUP, 'labelToDelete1'))
        .withConverter(labelConverter)
        .set({ ...mockLabel, id: 'labelToDelete1' });

      // act
      await deleteLabel(firestoreMock, 'labelToDelete1', GROUP, USER1);

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.label(GROUP, 'labelToDelete1'))
        .withConverter(labelConverter)
        .get();
      expect(docRef.exists).toBeFalsy();
    });

    test('with invalid user', async () => {
      // arrange
      await firestoreMock
        .doc(FirestoreCollections.label(GROUP, 'labelToDelete2'))
        .withConverter(labelConverter)
        .set({ ...mockLabel, id: 'labelToDelete2' });

      // act
      await deleteLabel(firestoreMock, 'labelToDelete2', GROUP, USER1 + 'invalid');

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.label(GROUP, 'labelToDelete2'))
        .withConverter(labelConverter)
        .get();
      expect(docRef.exists).toBeTruthy();
    });

    test('success delete expenses', async () => {
      // arrange
      await Promise.all([
        await firestoreMock
          .doc(FirestoreCollections.label(GROUP, 'labelToDelete3'))
          .withConverter(labelConverter)
          .set({ ...mockLabel, id: 'labelToDelete3' }),
        await firestoreMock
          .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete3'))
          .withConverter(expenseConverter)
          .set({ ...mockExpense, id: 'expenseToDelete3', labelId: 'labelToDelete3' })
      ]);

      // act
      await deleteLabel(firestoreMock, 'labelToDelete3', GROUP, USER1);

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.label(GROUP, 'labelToDelete3'))
        .withConverter(labelConverter)
        .get();
      expect(docRef.exists).toBeFalsy();
      const docRefExpense = await firestoreMock
        .doc(FirestoreCollections.expese(GROUP, 'expenseToDelete3'))
        .withConverter(expenseConverter)
        .get();
      expect(docRefExpense.exists).toBeFalsy();
    });
  });
});
