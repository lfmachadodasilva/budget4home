import { getUserId } from '@/shared/getUserId';
import { addLabel, getLabels } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const userId = await getUserId(request);
  const groupId = request.nextUrl.searchParams.get('groupId') as string;

  if (!userId) {
    return NextResponse.json({ message: 'NOT AUTHENTICATED' }, { status: 401 });
  }

  const labels = await getLabels(groupId, userId);

  return NextResponse.json(labels, { status: 200 });
}

export async function POST(request: NextRequest) {
  const userId = await getUserId(request);
  const { groupId, ...body } = await request.json();

  if (!userId) {
    return NextResponse.json({ message: 'NOT AUTHENTICATED' }, { status: 401 });
  }

  const labels = await addLabel(userId, groupId, body);

  return NextResponse.json(labels, { status: 200 });
}

export async function OPTIONS(_request: NextRequest) {
  return NextResponse.json({ message: 'ok' }, { status: 200 });
}
