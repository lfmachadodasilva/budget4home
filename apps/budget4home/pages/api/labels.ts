import { NextApiRequest, NextApiResponse } from "next/types";

import { Label } from "../../models/label";
import { addLabel, deleteLabel, updateLabel } from "../../repositories/labels";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../util/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const label = req.body as Label;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === "POST") {
      await addLabel(firebaseAdminFirestore, uid, label.groupId, label);
    } else if (req.method === "PUT") {
      await updateLabel(firebaseAdminFirestore, uid, label.groupId, label);
    } else if (req.method === "DELETE") {
      await deleteLabel(firebaseAdminFirestore, uid, label.groupId, label.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
