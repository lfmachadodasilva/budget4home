import { cookies } from "next/headers";
import { LabelForm } from "../(components)/form";
import { getFirstGroup } from "../../../../../repositories/groups";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  let groupId = params.groupId;

  if (!groupId) {
    const nextCookies = cookies();
    const token = nextCookies.get("token").value;
    const { uid } = await firebaseAdminAuth.verifyIdToken(token);
    groupId = await getFirstGroup(firebaseAdminFirestore, uid);
  }

  return (
    <>
      <h3>label</h3>
      <LabelForm groupId={groupId} />
    </>
  );
}
