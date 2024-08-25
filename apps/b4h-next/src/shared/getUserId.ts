import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { NextRequest } from 'next/server';

export const getUserId = async (request: NextRequest) => {
  try {
    const authorization = request.headers.get('Authorization') as string;
    const jwt = authorization?.startsWith('Bearer ')
      ? authorization.split('Bearer ')[1]
      : authorization;
    const decodedToken = await getFirebaseAdminAuth().verifyIdToken(jwt);
    return decodedToken.uid;
  } catch (err) {
    return null;
  }
};
