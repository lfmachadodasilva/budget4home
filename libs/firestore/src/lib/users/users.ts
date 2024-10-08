import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { UserModel } from '@b4h/models';

export const getUsersFirestore = async (nextPageToken?: string): Promise<UserModel[]> => {
  const { users } = await getFirebaseAdminAuth().listUsers(100, nextPageToken);

  let b4hUsers = users.map(user => {
    return {
      id: user.uid,
      displayName: user.displayName ?? null,
      email: user.email,
      photoUrl: user.photoURL ?? null
    } as UserModel;
  });

  if (nextPageToken) {
    b4hUsers = [...b4hUsers, ...(await getUsersFirestore(nextPageToken))];
  }

  return b4hUsers;
};
