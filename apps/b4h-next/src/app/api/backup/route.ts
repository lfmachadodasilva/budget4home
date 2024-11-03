import { getFirebaseAdminStorage } from '@b4h/firebase-admin';
import { getAllExpensesFirebase, getAllGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // if (request.headers.get('Authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
  //   return NextResponse.json({ isLogged: false }, { status: 401 });
  // }

  const groups = await getAllGroupsFirestore();

  for (const group of groups) {
    console.log('start to backup group: ', group.id);

    const userId = group.userIds[0] ?? null;
    if (!userId) {
      console.log('skip backup: no users available', group);
      continue;
    }

    const [labels, expenses] = await Promise.all([
      getLabelsFirestore(userId, group.id),
      getAllExpensesFirebase(userId, group.id)
    ]);

    const jsonString = JSON.stringify({ labels, expenses });

    // Create a buffer from the JSON string
    const buffer = Buffer.from(jsonString);

    // Define the file path in the bucket
    const filePath = `budget4home/backups/${group.id}/${new Date().toISOString()}.json`;

    try {
      await getFirebaseAdminStorage().bucket().file(filePath).save(jsonString);
      console.log('file created successfully', {
        groupId: group.id,
        labels: labels.length,
        expenses: expenses.length
      });
    } catch (err) {
      console.error('error saving file', err, group);
      continue;
    }

    console.log('end to backup group: ', group);
  }

  return NextResponse.json({}, { status: 200 });
}
