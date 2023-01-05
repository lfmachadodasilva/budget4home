import { redirect } from "next/navigation";
import { getUserId } from "../../util/getUserId";
import { groupRepository } from "../../util/repositories";
import { B4hRoutes } from "../../util/routes";

export default async function () {
  const userId = await getUserId();

  const group = await groupRepository.getFirst(userId);

  redirect(`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenses}`);
}
