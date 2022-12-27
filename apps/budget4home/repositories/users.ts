import { firebaseAdminAuth } from '../util/firebaseAdmin';

export const getAllUsers = async (nextPageToken?: string) => {
  const { users } = await firebaseAdminAuth.listUsers(100, nextPageToken);

  let b4hUsers = users.map(user => {
    return {
      id: user.uid,
      displayName: user.displayName ?? null,
      email: user.email,
      photoUrl: user.photoURL ?? null
    };
  });

  if (nextPageToken) {
    b4hUsers = [...b4hUsers, ...(await getAllUsers(nextPageToken))];
  }

  return b4hUsers;
};
