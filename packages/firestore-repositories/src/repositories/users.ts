import { IUserRepository } from '@budget4home/base';
import { Auth } from 'firebase-admin/auth';

export class UserRepository implements IUserRepository {
  constructor(private firebaseAdminAuth: Auth) {}

  getAll = async (nextPageToken?: string) => {
    const { users } = await this.firebaseAdminAuth.listUsers(100, nextPageToken);

    let b4hUsers = users.map(user => {
      return {
        id: user.uid,
        displayName: user.displayName ?? null,
        email: user.email,
        photoUrl: user.photoURL ?? null
      };
    });

    if (nextPageToken) {
      b4hUsers = [...b4hUsers, ...(await this.getAll(nextPageToken))];
    }

    return b4hUsers;
  };
}
