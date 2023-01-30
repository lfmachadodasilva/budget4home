import { cookies } from 'next/headers';
import { firebaseAdminAuth } from './firebaseAdmin';

export const getUserId = async () => {
  const nextCookies = cookies();

  try {
    const token = nextCookies.get('token')?.value;
    const { uid } = await firebaseAdminAuth.verifyIdToken(token);
    return uid;
  } catch (err: any) {
    console.error(err);

    if (err.errorInfo.code === 'auth/id-token-expired') {
      return nextCookies.get('uid')?.value;
    }
  }

  return null;
};
