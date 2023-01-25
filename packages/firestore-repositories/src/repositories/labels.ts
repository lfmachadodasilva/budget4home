import { IExpenseRepository, IGroupRepository, ILabelRepository, Label } from '@budget4home/base';
import { Firestore } from 'firebase-admin/firestore';
import { FirestoreCollections } from './collections';
import { getAddFirebaseData, getUpdateFirebaseData } from './util';

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

    return docs.docs.map(doc => this.labelToModel(doc));
  };

  get = async (userId: string, groupId: string, labelId: string) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const doc = await this.firestore.doc(FirestoreCollections.label(groupId, labelId)).get();
    return this.labelToModel(doc);
  };

  add = async (userId: string, groupId: string, label: Partial<Label>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const model = this.labelToFirestore(userId, label as Label);
    const doc = await this.firestore.collection(FirestoreCollections.labels(groupId)).add({
      ...model,
      ...getAddFirebaseData(userId)
    });

    return {
      ...model,
      id: doc.id,
      groupId: groupId
    } as Label;
  };

  edit = async (userId: string, groupId: string, label: Partial<Label>) => {
    if (await this.groupRepository.isInvalidGroup(userId, groupId)) {
      // TODO throw ex
      return null;
    }

    const model = this.labelToFirestore(userId, label as Label);
    const doc = await this.firestore.doc(FirestoreCollections.label(groupId, label.id)).set(
      {
        ...model,
        ...getUpdateFirebaseData(userId)
      },
      { merge: true }
    );

    return {
      ...model,
      groupId: groupId
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

  labelToModel = (doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>) => {
    const data = doc.data();
    return {
      id: doc.id,
      name: data.name,
      icon: data.icon
    } as Label;
  };

  labelToFirestore = (userId: string, model: Label) => {
    return {
      name: model.name.trim(),
      icon: model.icon.length > 0 ? model.icon.trim() : null
    } as Label;
  };
}
