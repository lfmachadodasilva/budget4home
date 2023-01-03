import { cookies } from "next/headers";
import Link from "next/link";
import { firebaseAdminAuth } from "../../util/firebaseAdmin";
import { groupRepository } from "../../util/repositories";
import { B4hRoutes } from "../../util/routes";

export default async function () {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const groups = await groupRepository.getAll(uid);

  return (
    <>
      <h3>groups</h3>
      <Link href={B4hRoutes.groupAdd}>add</Link>
      <ul>
        {groups.map((group) => {
          return (
            <li key={group.id}>
              <label>{group.name}</label>
              {" - "}
              <Link href={`${B4hRoutes.groups}/${group.id}`}>edit</Link>
              {" - "}
              <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.labels}`}>
                labels
              </Link>
              {" - "}
              <Link
                href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenses}`}
              >
                expenses
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
