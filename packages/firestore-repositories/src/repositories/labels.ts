import { IExpenseRepository, IGroupRepository, ILabelRepository, Label } from '@budget4home/base';
import { Firestore, Timestamp } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';

export class LabelRepository implements ILabelRepository {
  constructor(
    private firestore: Firestore,
    private groupRepository: IGroupRepository,
    private expenseRepository: IExpenseRepository
  ) {}

  getAll = async (userId: string, groupId: string) => {
    groupId = groupId ?? (await this.groupRepository.getFirst(userId)).id;

    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const docs = await this.firestore.collection(FirestoreCollections.labels(groupId)).get();

    return docs.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        icon: data.icon
      } as Label;
    });
  };

  get = async (userId: string, groupId: string, labelId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.label(groupId, labelId)).get();
    const data = doc.data();

    if (!data) {
      return null;
    }

    return {
      id: doc.id,
      name: data.name,
      icon: data.icon
    } as Label;
  };

  add = async (userId: string, groupId: string, label: Partial<Label>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.collection(FirestoreCollections.labels(groupId)).add({
      name: label.name,
      icon: label.icon,
      createdBy: userId,
      createdAt: Timestamp.fromDate(new Date()),
      updatedby: userId,
      updatedAt: Timestamp.fromDate(new Date())
    });

    return {
      id: doc.id,
      name: label.name,
      icon: label.icon,
      groupId: groupId
    } as Label;
  };

  edit = async (userId: string, groupId: string, label: Partial<Label>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.label(groupId, label.id)).set(
      {
        name: label.name,
        icon: label.icon,
        updatedby: userId,
        updatedAt: Timestamp.fromDate(new Date())
      },
      { merge: true }
    );

    return {
      id: label.id,
      name: label.name,
      icon: label.icon,
      groupId: label.groupId
    } as Label;
  };

  delete = async (userId: string, groupId: string, labelId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const docPromise = this.firestore.doc(FirestoreCollections.label(groupId, labelId)).delete();

    const docExpensesPromise = this.expenseRepository.deleteByLabel(userId, groupId, labelId);

    await Promise.all([docPromise, docExpensesPromise]);

    return Promise.resolve();
  };
}
