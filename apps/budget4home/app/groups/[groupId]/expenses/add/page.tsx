import { cookies } from "next/headers";
import { ExpenseForm } from "../(components)/form";
import { groupRepository, labelRepository } from "../../../../../repositories";
import { firebaseAdminAuth } from "../../../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  let groupId = params.groupId;

  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  if (!groupId) {
    groupId = await groupRepository.getFirst(uid);
  }

  const labels = await labelRepository.getAll(uid, params.groupId);

  return (
    <>
      <ExpenseForm groupId={groupId} labels={labels} />
    </>
  );
}
