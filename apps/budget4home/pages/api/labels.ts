import { Label } from "@budget4home/base";
import { NextApiRequest, NextApiResponse } from "next/types";

import { firebaseAdminAuth } from "../../util/firebaseAdmin";
import { labelRepository } from "../../util/repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const label = req.body as Label;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === "POST") {
      await labelRepository.add(uid, label.groupId, label);
    } else if (req.method === "PUT") {
      await labelRepository.edit(uid, label.groupId, label);
    } else if (req.method === "DELETE") {
      await labelRepository.delete(uid, label.groupId, label.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
