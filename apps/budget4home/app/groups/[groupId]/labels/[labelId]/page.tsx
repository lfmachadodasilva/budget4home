import { cookies } from "next/headers";
import { LabelForm } from "../(components)/form";
import { labelRepository } from "../../../../../repositories";
import { firebaseAdminAuth } from "../../../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const label = await labelRepository.get(uid, params.groupId, params.labelId);

  return (
    <>
      <h3>label</h3>
      <LabelForm label={label} groupId={params.groupId} />
    </>
  );
}
