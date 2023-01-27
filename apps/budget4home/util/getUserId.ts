import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { firebaseAdminAuth } from './firebaseAdmin';
import { B4hRoutes } from './routes';

export const getUserId = async () => {
  const nextCookies = cookies();

  try {
    const token = nextCookies.get('token')?.value;
    const { uid } = await firebaseAdminAuth.verifyIdToken(token);
    return uid;
  } catch (err: any) {
    console.error(err);
    //redirect(B4hRoutes.logout);
  }
};
