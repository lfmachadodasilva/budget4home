import { SESSION } from '@/utils/constants';
import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { getGroupsFirestore } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const session = request.headers.get(SESSION);

  if (!session) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  // use Firebase Admin to validate the session cookie
  const decodedClaims = await getFirebaseAdminAuth().verifySessionCookie(session, true);

  if (!decodedClaims) {
    return NextResponse.json({ isLogged: false }, { status: 401 });
  }

  const userId = decodedClaims.uid;

  const groups = await getGroupsFirestore(userId);

  return NextResponse.json(groups, { status: 200 });
}
