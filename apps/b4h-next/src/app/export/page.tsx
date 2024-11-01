import { fetchGroups } from '@/clients/groups';
import { b4hSession } from '@/utils/session';
import { B4hExportForm } from './(components)/form';

export const metadata = {
  title: 'export | budget4home'
};

export default async function Export() {
  const { getFavoriteGroupId } = b4hSession();
  const [{ groupId, userId }, groups] = await Promise.all([getFavoriteGroupId(), fetchGroups()]);

  return (
    <div className="flex flex-col gap-sm">
      <h1>export</h1>
      <B4hExportForm groupId={groupId} groups={groups} userId={userId} />
    </div>
  );
}
