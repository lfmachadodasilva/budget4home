import { B4hButtonLink } from '@budget4home/ui-components';
import { GroupItem } from '../../components/item/group';
import { SubHeader } from '../../components/subheader';
import { getDefaultGroupId } from '../../util/defaultOrFirstGroup';
import { getUserId } from '../../util/getUserId';
import { groupRepository } from '../../util/repositories';
import { B4hRoutes } from '../../util/routes';

export default async function () {
  const userId = await getUserId();

  const groups = await groupRepository.getAll(userId);
  const defaultGroupId = getDefaultGroupId(groups);

  return (
    <>
      <SubHeader
        label="Groups"
        action={<B4hButtonLink href={B4hRoutes.groupAdd}>add</B4hButtonLink>}
      />

      {groups.length <= 0 && <h4>Empty list of group.</h4>}

      {groups.map(group => (
        <GroupItem group={group} key={group.id} default={group.id === defaultGroupId} />
      ))}
    </>
  );
}
