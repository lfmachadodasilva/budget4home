import { cookies } from "next/headers";
import { GroupForm } from "../(components)/form";
import { firebaseAdminAuth } from "../../../util/firebaseAdmin";
import { groupRepository, userRepository } from "../../../util/repositories";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const groupPromise = groupRepository.get(uid, params.groupId);
  const usersPromise = userRepository.getAll();

  const [group, users] = await Promise.all([groupPromise, usersPromise]);

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} group={group} />
    </>
  );
}
