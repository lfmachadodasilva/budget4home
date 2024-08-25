import { getUserId } from '@/shared/getUserId';
import { getGroups } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  if (!userId) {
    return NextResponse.json({ message: 'NOT_AUTHENTICATED' }, { status: 401 });
  }

  const data = await getGroups(userId);

  return NextResponse.json({ data }, { status: 200 });
}
