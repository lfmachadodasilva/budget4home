import { getGroupFirestore, getUsersFirestore } from '@b4h/firestore';
import { useB4hSession } from '../../..//utils/hooks/useB4hSession';
import { B4hGroupForm } from '../../../components/forms/groups';
import { B4hNotFound } from '../../../components/notFound';

export const metadata = {
  title: 'update group | budget4home'
};

export default async function GroupUpdate({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = useB4hSession();

  const [group, users] = await Promise.all([getGroupFirestore(userId, id), getUsersFirestore()]);

  if (!group) {
    return <B4hNotFound />;
  }

  return <B4hGroupForm users={users} group={group} />;
}
