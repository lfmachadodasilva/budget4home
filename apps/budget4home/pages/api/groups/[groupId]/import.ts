import { Label } from '@budget4home/base';
import { NextApiRequest, NextApiResponse } from 'next/types';
import { firebaseAdminAuth } from '../../../../util/firebaseAdmin';
import { expenseRepository, labelRepository } from '../../../../util/repositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const groupId = req.query.groupId as string;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const labels = await labelRepository.getAll(uid, groupId);

  let response: any = null;

  try {
    let labelObjects: any = req.body;

    for (let labelIndex = 0; labelIndex < labelObjects.length; labelIndex++) {
      const { expenses, ...copyLabel } = labelObjects[labelIndex];

      let label: Label = null;

      // check if label exist
      if (copyLabel.id) {
        const label2Find = labels.find(x => x.id === copyLabel.id);
        if (label2Find) {
          label = labels.find(x => x.id === label.id);
        }
      }

      // if label does not exist, create new one
      label = label ?? (await labelRepository.add(uid, groupId, copyLabel));

      for (let expenseIndex = 0; expenseIndex < expenses.length; expenseIndex++) {
        const expense = expenses[expenseIndex];

        expenseRepository.add(uid, groupId, {
          ...expense,
          label: { id: label.id }
        });
      }
    }

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
