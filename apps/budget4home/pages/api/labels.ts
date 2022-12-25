import { NextApiRequest, NextApiResponse } from 'next/types';
import { Label } from '../../modals/label';
import { addLabel, deleteLabel, updateLabel } from '../../repositories/label';
import { firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const label = req.body as Label;

  try {
    if (req.method === 'POST') {
      await addLabel(firebaseAdminFirestore, '', label.groupId, label);
    } else if (req.method === 'PUT') {
      await updateLabel(firebaseAdminFirestore, '', label.groupId, label);
    } else if (req.method === 'DELETE') {
      await deleteLabel(firebaseAdminFirestore, '', label.groupId, label.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
