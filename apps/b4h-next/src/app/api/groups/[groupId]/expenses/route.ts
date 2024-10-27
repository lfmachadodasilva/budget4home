'use server';

import { SESSION } from '@/utils/constants';
import { getDateFromQuery } from '@/utils/expenses';
import { getFirebaseAdminAuth } from '@b4h/firebase-admin';
import { getExpensesFirebase } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ groupId: string }> }
) {
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
  const param = await params;

  const searchParams = request.nextUrl.searchParams;
  const date = getDateFromQuery(searchParams.get('year'), searchParams.get('month'));

  const expenses = await getExpensesFirebase(userId, param.groupId, date);

  return NextResponse.json(expenses, { status: 200 });
}
