import { RulesTestEnvironment } from '@firebase/rules-unit-testing';
import { type Firestore } from 'firebase-admin/firestore';

import { FirestoreCollections } from '../collections';
import { GROUP, ID_MATCH, USER1 } from '../contants';
import { getMockFirebase, mockGroup } from '../mock';
import { groupConverter } from './groupConverter';
import { addOrUpdateGroup, deleteGroup, getAllGroups, getGroup } from './groupRepository';

describe('group repository', () => {
  let firebaseMock: RulesTestEnvironment;
  let firestoreMock: Firestore;

  beforeAll(async () => {
    firebaseMock = await getMockFirebase('gropus-tests');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    firestoreMock = firebaseMock.unauthenticatedContext().firestore() as any;

    await Promise.all([
      firestoreMock
        .doc(FirestoreCollections.group(mockGroup.id))
        .withConverter(groupConverter)
        .set(mockGroup)
    ]);
  });
  afterAll(async () => {
    firebaseMock.clearFirestore();
  });

  describe('get all groups', () => {
    test('success', async () => {
      // arrange
      // act
      const models = await getAllGroups(firestoreMock, USER1);

      // assert
      expect(models).toHaveLength(1);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const models = await getAllGroups(firestoreMock, USER1 + 'invalid');

      // assert
      expect(models).toHaveLength(0);
    });
  });

  describe('get group by id', () => {
    test('success', async () => {
      // arrange
      // act
      const model = await getGroup(firestoreMock, GROUP, USER1);

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toBe(GROUP);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await getGroup(firestoreMock, GROUP, USER1 + 'invalid');

      // assert
      expect(model).toBeNull();
    });

    test('with invalid group id', async () => {
      // arrange
      // act
      const model = await getGroup(firestoreMock, GROUP + 'invalid', USER1);

      // assert
      expect(model).toBeNull();
    });
  });

  describe('add group', () => {
    test('success with specific group id', async () => {
      // arrange
      // act
      const model = await addOrUpdateGroup(firestoreMock, { ...mockGroup, id: 'newGroup' }, USER1);

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toBe('newGroup');
      expect(model?.createdAt).toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.group('newGroup'))
          .withConverter(groupConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('success with no group id', async () => {
      // arrange
      // act
      const model = await addOrUpdateGroup(firestoreMock, { ...mockGroup, id: undefined }, USER1);

      // assert
      expect(model).toBeDefined();
      expect(model?.id).toMatch(ID_MATCH);
      expect(model?.createdAt).toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.group(model?.id ?? ''))
          .withConverter(groupConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await addOrUpdateGroup(
        firestoreMock,
        { ...mockGroup, id: undefined },
        USER1 + 'invalid'
      );

      // assert
      expect(model).toBeNull();
    });
  });

  describe('update group', () => {
    test('success', async () => {
      // arrange
      // act
      const model = await addOrUpdateGroup(
        firestoreMock,
        { ...mockGroup, name: 'Group name updated' },
        USER1
      );

      // assert
      expect(model).toBeDefined();
      expect(model?.name).toEqual('Group name updated');

      expect(model?.createdAt).not.toEqual(model?.updatedAt);
      expect(model?.createdBy).toEqual(USER1);
      expect(model?.updatedBy).toEqual(USER1);

      const doc = (
        await firestoreMock
          .doc(FirestoreCollections.group(model?.id ?? ''))
          .withConverter(groupConverter)
          .get()
      ).data();
      expect(doc).toEqual(model);
    });

    test('with invalid user', async () => {
      // arrange
      // act
      const model = await addOrUpdateGroup(
        firestoreMock,
        { ...mockGroup, name: 'Group 2' },
        USER1 + 'invalid'
      );

      // assert
      expect(model).toBeNull();
    });
  });

  describe('delete group', () => {
    test('success', async () => {
      // arrange
      await firestoreMock
        .doc(FirestoreCollections.group('groupToDelete1'))
        .withConverter(groupConverter)
        .set({ ...mockGroup, id: 'groupToDelete1' });

      // act
      await deleteGroup(firestoreMock, 'groupToDelete1', USER1);

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.group('groupToDelete1'))
        .withConverter(groupConverter)
        .get();
      expect(docRef.exists).toBeFalsy();
    });

    test('with invalid user', async () => {
      // arrange
      await firestoreMock
        .doc(FirestoreCollections.group('groupToDelete2'))
        .withConverter(groupConverter)
        .set({ ...mockGroup, id: 'groupToDelete2' });

      // act
      await deleteGroup(firestoreMock, 'groupToDelete2', USER1 + 'invalid');

      // assert
      const docRef = await firestoreMock
        .doc(FirestoreCollections.group('groupToDelete2'))
        .withConverter(groupConverter)
        .get();
      expect(docRef.exists).toBeTruthy();
    });
  });
});
