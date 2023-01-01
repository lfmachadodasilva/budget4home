import { cookies } from "next/headers";
import { GroupForm } from "../(components)/form";
import { getGroup } from "../../../repositories/groups";
import { getAllUsers } from "../../../repositories/users";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../../util/firebaseAdmin";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const groupPromise = getGroup(firebaseAdminFirestore, uid, params.groupId);
  const usersPromise = getAllUsers();

  const [group, users] = await Promise.all([groupPromise, usersPromise]);

  return (
    <>
      <h3>group</h3>
      <GroupForm users={users} group={group} />
    </>
  );
}
