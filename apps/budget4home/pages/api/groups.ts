import { Group } from "@budget4home/base";
import { NextApiRequest, NextApiResponse } from "next/types";

import { groupRepository } from "../../repositories";
import { firebaseAdminAuth } from "../../util/firebaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const group = req.body as Group;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === "POST") {
      await groupRepository.add(uid, group);
    } else if (req.method === "PUT") {
      await groupRepository.edit(uid, group);
    } else if (req.method === "DELETE") {
      await groupRepository.delete(uid, group.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
