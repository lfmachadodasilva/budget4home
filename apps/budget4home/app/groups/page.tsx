import Link from "next/link";
import { getUserId } from "../../util/getUserId";
import { groupRepository } from "../../util/repositories";
import { B4hRoutes } from "../../util/routes";

export default async function () {
  const userId = await getUserId();

  const groups = await groupRepository.getAll(userId);

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
              {" - "}
              <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.export}`}>
                export
              </Link>
              {" - "}
              <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.import}`}>
                import
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
