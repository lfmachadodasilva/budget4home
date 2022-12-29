import { NextApiRequest, NextApiResponse } from 'next/types';
import { Expense } from '../../models/expense';
import { firebaseAdminAuth } from '../../util/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const expense = req.body as Expense;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    // TODO

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
