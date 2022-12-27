import { NextApiRequest, NextApiResponse } from 'next/types';
import { Expense } from '../../modals/expense';
import { addExpense, deleteExpense, updateExpense } from '../../repositories/expenses';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const expense = req.body as Expense;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === 'POST') {
      await addExpense(firebaseAdminFirestore, uid, expense.groupId, expense);
    } else if (req.method === 'PUT') {
      await updateExpense(firebaseAdminFirestore, uid, expense.groupId, expense);
    } else if (req.method === 'DELETE') {
      await deleteExpense(firebaseAdminFirestore, uid, expense.groupId, expense.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
