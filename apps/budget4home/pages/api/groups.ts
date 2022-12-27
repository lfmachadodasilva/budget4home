import { NextApiRequest, NextApiResponse } from 'next/types';
import { Group } from '../../modals/group';
import { addGroup, deleteGroup, updateGroup } from '../../repositories/groups';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const group = req.body as Group;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === 'POST') {
      await addGroup(firebaseAdminFirestore, uid, group);
    } else if (req.method === 'PUT') {
      await updateGroup(firebaseAdminFirestore, uid, group);
    } else if (req.method === 'DELETE') {
      await deleteGroup(firebaseAdminFirestore, uid, group.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
