import { Base } from '@budget4home/base';
import { Timestamp } from 'firebase-admin/firestore';

export const getAddFirebaseData = (base: Base, userId: string) => {
  return {
    createdBy: base.createdBy ?? userId,
    createdAt: base.createdAt
      ? Timestamp.fromDate(new Date(base.createdAt))
      : Timestamp.fromDate(new Date()),
    ...getUpdateFirebaseData(base, userId)
  };
};

export const getUpdateFirebaseData = (base: Base, userId: string) => {
  return {
    updatedBy: base.updatedBy ?? userId,
    updatedAt: base.updatedAt
      ? Timestamp.fromDate(new Date(base.updatedAt))
      : Timestamp.fromDate(new Date())
  };
};
