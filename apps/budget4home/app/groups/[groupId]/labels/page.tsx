import { cookies } from "next/headers";
import Link from "next/link";
import { labelRepository } from "../../../../repositories";
import { firebaseAdminAuth } from "../../../../util/firebaseAdmin";
import { B4hRoutes } from "../../../../util/routes";

export default async function ({ params }: any) {
  const nextCookies = cookies();
  const token = nextCookies.get("token").value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const labels = await labelRepository.getAll(uid, params?.groupId);

  return (
    <>
      <h3>labels</h3>
      <Link href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.labelAdd}`}>
        add
      </Link>
      <ul>
        {labels.map((label) => {
          return (
            <li key={label.id}>
              <label>{label.name}</label>
              {" - "}
              <Link
                href={`${B4hRoutes.groups}/${params.groupId}${B4hRoutes.labels}/${label.id}`}
              >
                edit
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
