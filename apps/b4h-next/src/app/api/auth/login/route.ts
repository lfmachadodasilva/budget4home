'use server';

import { b4hSession } from '@/utils/session';
import { cleanGroupsCache, setFavoriteGroupIdSession } from '@/utils/session.actions';
import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { SESSION, SESSION_USER_ID, SESSIONS } from '../../../../utils/constants';

export async function POST(_request: NextRequest) {
  const [header, cookie] = await Promise.all([headers(), cookies()]);

  const authorization = header.get('Authorization');
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
        name: SESSION,
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true
      };

      // add the cookie to the browser
      cookie.set(options);

      cookie.set({
        name: SESSION_USER_ID,
        value: decodedToken.uid,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true
      });

      // set the first group as favorite if it doesn't exist
      const { getFavoriteGroupId } = b4hSession();
      const { groupId } = await getFavoriteGroupId();
      await setFavoriteGroupIdSession(groupId);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(_request: NextRequest) {
  const cookie = await cookies();

  const session = cookie.get(SESSION)?.value || '';

  // validate if the cookie exist in the request
  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // use Firebase Admin to validate the session cookie
  const decodedClaims = await getFirebaseAdminAuth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // set the first group as favorite if it doesn't exist
  const { getFavoriteGroupId } = b4hSession();
  const { groupId } = await getFavoriteGroupId();
  await setFavoriteGroupIdSession(groupId);

  return NextResponse.json({ isLogged: true }, { status: 200 });
}

export async function DELETE(_request: NextRequest) {
  const cookie = await cookies();

  // clean cookies
  SESSIONS.forEach(session => cookie.delete(session));

  await cleanGroupsCache();

  return NextResponse.json({}, { status: 200 });
}
