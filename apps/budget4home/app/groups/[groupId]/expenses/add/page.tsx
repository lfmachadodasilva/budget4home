import { cookies } from "next/headers";
import { ExpenseForm } from "../(components)/form";
import { firebaseAdminAuth } from "../../../../../util/firebaseAdmin";
import {
  groupRepository,
  labelRepository,
} from "../../../../../util/repositories";

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
