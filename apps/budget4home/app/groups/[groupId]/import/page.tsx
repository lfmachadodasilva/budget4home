import { cookies } from "next/headers";

import { firebaseAdminAuth } from "../../../../util/firebaseAdmin";
import {
  groupRepository,
  labelRepository,
} from "../../../../util/repositories";
import { ImportUi } from "./(components)/ui";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const groupPromise = groupRepository.get(uid, params.groupId);
  const labelsPromise = labelRepository.getAll(uid, params.groupId);

  const [group, labels] = await Promise.all([groupPromise, labelsPromise]);

  return (
    <>
      <h3>Import</h3>
      <ImportUi labels={labels} group={group} />
    </>
  );
}
