import { Expense } from '@budget4home/base';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { firebaseAdminAuth } from '../../../util/firebaseAdmin';
import { expenseRepository } from '../../../util/repositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const expense = req.body as Expense;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let response: any = null;

  const parentId = expense.parent?.id ?? expense.id;

  try {
    if (req.method === 'PUT') {
      response = await expenseRepository.editByParent(uid, expense.groupId, parentId, expense);
    } else if (req.method === 'DELETE') {
      response = await expenseRepository.deleteByParent(uid, expense.groupId, parentId);
    } else {
      return res.status(404).end();
    }

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
