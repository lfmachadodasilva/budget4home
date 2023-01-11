import { Group, IGroupRepository } from '@budget4home/base';

import { FieldPath, Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';
import { getAddFirebaseData, getUpdateFirebaseData } from './util';

export class GroupRepository implements IGroupRepository {
  constructor(private firestore: Firestore) {}

  getAll = async (userId: string) => {
    const col = await this.firestore
      .collection(FirestoreCollections.groups)
      .where('userIds', 'array-contains', userId)
      .get();

    return col.docs.map(doc => {
      return {
        id: doc.id,
        name: doc.data().name
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
      name: group.name,
      userIds: group.userIds,
      ...getAddFirebaseData(userId)
    });

    return {
      id: col.id,
      name: group.name,
      userIds: group.userIds
    } as Group;
  };

  edit = async (userId: string, group: Partial<Group>) => {
    if (await this.isInvalidGroup(userId, group.id)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.group(group.id)).set(
      {
        name: group.name,
        userIds: group.userIds,
        ...getUpdateFirebaseData(userId)
      },
      { merge: true }
    );

    return {
      id: group.id,
      name: group.name,
      userIds: group.userIds
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
