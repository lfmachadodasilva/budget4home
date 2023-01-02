import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getFirstGroup } from "../../repositories/groups";
import {
  firebaseAdminAuth,
  firebaseAdminFirestore,
} from "../../util/firebaseAdmin";
import { B4hRoutes } from "../../util/routes";

export default async function () {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const group = await getFirstGroup(firebaseAdminFirestore, uid);

  redirect(`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenses}`);
}
