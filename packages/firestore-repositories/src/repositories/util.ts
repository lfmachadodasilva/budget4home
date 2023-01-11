import { Timestamp } from 'firebase-admin/firestore';

export const getAddFirebaseData = (userId: string) => {
  return {
    createdBy: userId,
    createdAt: Timestamp.fromDate(new Date()),
    updatedby: userId,
    updatedAt: Timestamp.fromDate(new Date())
  };
};

export const getUpdateFirebaseData = (userId: string) => {
  return {
    updatedby: userId,
    updatedAt: Timestamp.fromDate(new Date())
  };
};
