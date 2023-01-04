import { Group } from "@budget4home/base";
import { NextApiRequest, NextApiResponse } from "next/types";

import { firebaseAdminAuth } from "../../util/firebaseAdmin";
import { groupRepository } from "../../util/repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const group = req.body as Group;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let response: any = null;

  try {
    if (req.method === "POST") {
      response = await groupRepository.add(uid, group);
    } else if (req.method === "PUT") {
      response = await groupRepository.edit(uid, group);
    } else if (req.method === "DELETE") {
      response = await groupRepository.delete(uid, group.id);
    }

    res.status(200).send(response);
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}
