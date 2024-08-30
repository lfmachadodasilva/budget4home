import { getFirebaseAdminAuth } from '@b4h/firebase-admin';

export const getUsers = async (nextPageToken?: string) => {
  const { users } = await getFirebaseAdminAuth().listUsers(100, nextPageToken);

  let b4hUsers = users.map(user => {
    return {
      id: user.uid,
      displayName: user.displayName ?? null,
      email: user.email,
      photoUrl: user.photoURL ?? null
    };
  });

  if (nextPageToken) {
    b4hUsers = [...b4hUsers, ...(await getUsers(nextPageToken))];
  }

  return b4hUsers;
};
