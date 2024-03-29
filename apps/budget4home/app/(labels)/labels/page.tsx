import { redirect } from 'next/navigation';
import { getUserId } from '../../../util/getUserId';
import { groupRepository } from '../../../util/repositories';
import { B4hRoutes } from '../../../util/routes';

export default async function LabelsPage() {
  const userId = await getUserId();

  const group = await groupRepository.getFirst(userId);

  if (group) {
    redirect(`${B4hRoutes.groups}/${group.id}${B4hRoutes.labels}`);
  }

  return (
    <>
      <h4>
        You don not have any group yet. Click <a href={B4hRoutes.groupAdd}>here</a> to create one
      </h4>
    </>
  );
}
