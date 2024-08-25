import { useB4hSession } from '@/hooks/useSession';
import { getGroups } from '@b4h/firestore';
import { GroupModel } from '@b4h/models';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function GroupsPage() {
  const { userId } = useB4hSession();

  let groups: GroupModel[] | null = null;
  try {
    groups = await getGroups(userId);
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      Groups
      {groups && (
        <div>
          {groups.length}
          {groups.map(groups => (
            <div key={groups.id}>{groups.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
