import { Expense } from "@budget4home/base";
import { NextApiRequest, NextApiResponse } from "next/types";
import { firebaseAdminAuth } from "../../util/firebaseAdmin";
import { expenseRepository } from "../../util/repositories";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const expense = req.body as Expense;

  const token = req.headers.authorization;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  try {
    if (req.method === "POST") {
      await expenseRepository.add(uid, expense.groupId, expense);
    } else if (req.method === "PUT") {
      await expenseRepository.edit(uid, expense.groupId, expense);
    } else if (req.method === "DELETE") {
      await expenseRepository.delete(uid, expense.groupId, expense.id);
    }

    res.status(200).end();
  } catch (e) {
    console.error(e);
    res.status(400).end();
  }
}