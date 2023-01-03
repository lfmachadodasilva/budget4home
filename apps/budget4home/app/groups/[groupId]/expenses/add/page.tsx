import { cookies } from "next/headers";
import { ExpenseForm } from "../(components)/form";
import { labelRepository } from "../../../../../repositories";
import { getFirstGroup } from "../../../../../repositories/groups";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  let groupId = params.groupId;

  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  if (!groupId) {
    groupId = await getFirstGroup(firebaseAdminFirestore, uid);
  }

  const labels = await labelRepository.getAll(uid, params.groupId);

  return (
    <>
      <ExpenseForm groupId={groupId} labels={labels} />
    </>
  );
}
