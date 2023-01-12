import { Label } from '@budget4home/base';
import { NextApiRequest, NextApiResponse } from 'next/types';

import { firebaseAdminAuth } from '../../util/firebaseAdmin';
import { labelRepository } from '../../util/repositories';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const label = req.body as Label;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let response: any = null;

  try {
    if (req.method === 'POST') {
      response = await labelRepository.add(uid, label.groupId, label);
    } else if (req.method === 'PUT') {
      response = await labelRepository.edit(uid, label.groupId, label);
    } else if (req.method === 'DELETE') {
      response = await labelRepository.delete(uid, label.groupId, label.id);
    } else {
      return res.status(404).end();
    }

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
