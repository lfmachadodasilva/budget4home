import { cookies } from "next/headers";
import { ExpenseForm } from "../(components)/form";
import { getExpense } from "../../../../../repositories/expenses";
import { getAllLabels } from "../../../../../repositories/labels";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const expensePromise = getExpense(
    firebaseAdminFirestore,
    uid,
    params.groupId,
    params.expenseId
  );

  const labelsPromise = getAllLabels(
    firebaseAdminFirestore,
    uid,
    params.groupId
  );

  const [expense, labels] = await Promise.all([expensePromise, labelsPromise]);

  return (
    <>
      <ExpenseForm expense={expense} labels={labels} groupId={params.groupId} />
    </>
  );
}
