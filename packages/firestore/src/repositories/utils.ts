import { Timestamp } from 'firebase-admin/firestore';
import { BaseEntity } from '../entities';

export const getAddFirebaseData = (base: BaseEntity, userId: string) => {
  return {
    createdBy: base.createdBy ?? userId,
    createdAt: base.createdAt
      ? Timestamp.fromDate(new Date(base.createdAt))
      : Timestamp.fromDate(new Date()),
    ...getUpdateFirebaseData(base, userId)
  };
};

export const getUpdateFirebaseData = (base: BaseEntity, userId: string) => {
  return {
    updatedBy: base.updatedBy ?? userId,
    updatedAt: base.updatedAt
      ? Timestamp.fromDate(new Date(base.updatedAt))
      : Timestamp.fromDate(new Date())
  };
};
