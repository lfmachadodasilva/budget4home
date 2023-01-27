import { Group, IGroupRepository } from '@budget4home/base';

import { FieldPath, Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';
import { getAddFirebaseData, getUpdateFirebaseData } from './util';

export class GroupRepository implements IGroupRepository {
  constructor(private firestore: Firestore) {}

  getAll = async (userId: string) => {
    const col = userId
      ? await this.firestore
          .collection(FirestoreCollections.groups)
          .where('userIds', 'array-contains', userId)
          .get()
      : await this.firestore.collection(FirestoreCollections.groups).get();

    return col.docs.map(doc => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        userIds: data.userIds
      } as Group;
    });
  };

  getFirst = async (userId: string) => {
    const col = await this.firestore
      .collection(FirestoreCollections.groups)
      .where('userIds', 'array-contains', userId)
      .get();

    if (col.docs.length === 0) {
      return null;
    }

    const doc = col.docs[0];
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      userIds: data.userIds
    } as Group;
  };

  get = async (userId: string, groupId: string) => {
    if (await this.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.group(groupId)).get();
    const data = doc.data();

    return {
      id: doc.id,
      name: data.name,
      userIds: data.userIds
    } as Group;
  };

  add = async (userId: string, group: Partial<Group>) => {
    const col = await this.firestore.collection(FirestoreCollections.groups).add({
      ...group,
      ...getAddFirebaseData(group as Group, userId)
    });

    return {
      ...group,
      id: col.id
    } as Group;
  };

  edit = async (userId: string, group: Partial<Group>) => {
    if (await this.isInvalidGroup(userId, group.id)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.group(group.id)).set(
      {
        ...group,
        ...getUpdateFirebaseData(group as Group, userId)
      },
      { merge: true }
    );

    return {
      ...group,
      id: group.id
    } as Group;
  };

  delete = async (userId: string, groupId: string) => {
    if (await this.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    await this.firestore.recursiveDelete(this.firestore.doc(FirestoreCollections.group(groupId)));

    return Promise.resolve();
  };

  isInvalidGroup = async (userId: string, groupId: string) => {
    const col = await this.firestore
      .collection(FirestoreCollections.groups)
      .where('userIds', 'array-contains', userId)
      .where(FieldPath.documentId(), '==', groupId)
      .count()
      .get();
    return col.data().count !== 1;
  };
}
