import { getUserId } from '@/shared/getUserId';
import { getExpenses } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  const groupId = request.nextUrl.searchParams.get('groupId') as string;

  if (!userId) {
    return NextResponse.json({ message: 'NOT AUTHENTICATED' }, { status: 401 });
  }

  const labels = await getExpenses(groupId, userId);

  return NextResponse.json(labels, { status: 200 });
}

export async function OPTIONS(_request: NextRequest) {
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
