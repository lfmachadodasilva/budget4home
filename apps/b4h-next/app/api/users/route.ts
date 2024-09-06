import { getUserId } from '@/shared/getUserId';
import { getUsers } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);

  if (!userId) {
    return NextResponse.json({ message: 'NOT AUTHENTICATED' }, { status: 401 });
  }

  const users = await getUsers();

  return NextResponse.json(users, { status: 200 });
}

export async function OPTIONS(_request: NextRequest) {
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
