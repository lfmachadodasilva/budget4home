import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { firebaseAdminAuth } from "../../util/firebaseAdmin";
import { groupRepository } from "../../util/repositories";
import { B4hRoutes } from "../../util/routes";

export default async function () {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const group = await groupRepository.getFirst(uid);

  redirect(`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenses}`);
}
