import { cookies } from "next/headers";
import { ExpenseForm } from "../(components)/form";
import { firebaseAdminAuth } from "../../../../../util/firebaseAdmin";
import {
  expenseRepository,
  labelRepository,
} from "../../../../../util/repositories";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const expensePromise = expenseRepository.get(
    uid,
    params.groupId,
    params.expenseId
  );

  const labelsPromise = labelRepository.getAll(uid, params.groupId);

  const [expense, labels] = await Promise.all([expensePromise, labelsPromise]);

  return (
    <>
      <ExpenseForm expense={expense} labels={labels} groupId={params.groupId} />
    </>
  );
}
