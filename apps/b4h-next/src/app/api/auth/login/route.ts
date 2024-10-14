import { b4hSession } from '@/utils/session';
import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  SESSION,
  SESSION_GROUP_ID,
  SESSION_GROUP_IDS,
  SESSION_USER_ID
} from '../../../../utils/constants';

export async function POST(request: NextRequest, response: NextResponse) {
  const authorization = headers().get('Authorization');
  if (authorization?.startsWith('Bearer ')) {
    const idToken = authorization.split('Bearer ')[1];
    const decodedToken = await getFirebaseAdminAuth().verifyIdToken(idToken);

    if (decodedToken) {
      // generate session cookie
      const expiresIn = 60 * 60 * 24 * 5 * 1000;
      const sessionCookie = await getFirebaseAdminAuth().createSessionCookie(idToken, {
        expiresIn
      });
      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true
      };

      // add the cookie to the browser
      cookies().set(options);

      cookies().set({
        name: SESSION_USER_ID,
        value: decodedToken.uid,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true
      });

      const { getFavoriteGroupId } = b4hSession();
      await getFavoriteGroupId();
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(request: NextRequest) {
  const session = cookies().get(SESSION)?.value || '';

  // validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // use Firebase Admin to validate the session cookie
  const decodedClaims = await getFirebaseAdminAuth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const { getFavoriteGroupId } = b4hSession();
  await getFavoriteGroupId();

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function DELETE(request: NextRequest, response: NextResponse) {
  // clean cookies
  cookies().delete(SESSION);
  cookies().delete(SESSION_USER_ID);
  cookies().delete(SESSION_GROUP_IDS);
  cookies().delete(SESSION_GROUP_ID);

  const { cleanGroupsCache } = b4hSession();
  cleanGroupsCache();

  return NextResponse.json({}, { status: 200 });
}
