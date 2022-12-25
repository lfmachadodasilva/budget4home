import { NextApiRequest, NextApiResponse } from 'next/types';
import { Group } from '../../modals/group';
import { addGroup, deleteGroup, updateGroup } from '../../repositories/groups';
import { firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const group = req.body as Group;

  console.log('/api/groups', group);

  try {
    if (req.method === 'POST') {
      await addGroup(firebaseAdminFirestore, '', group);
    } else if (req.method === 'PUT') {
      await updateGroup(firebaseAdminFirestore, '', group);
    } else if (req.method === 'DELETE') {
      await deleteGroup(firebaseAdminFirestore, '', group.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
