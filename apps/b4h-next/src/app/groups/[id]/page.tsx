import { useB4hSession } from 'apps/b4h-next/src/utils/hooks/useB4hSession';
import { B4hGroupForm } from '../form';
import { getGroupFirestore, getUsersFirestore } from '@b4h/firestore';

export const metadata = {
  title: 'update group | budget4home'
};

export default async function GroupUpdate({ params }: { params: { id: string } }) {
  const { id } = params;
  const { userId } = useB4hSession();

  const [group, users] = await Promise.all([getGroupFirestore(userId, id), getUsersFirestore()]);

  return <B4hGroupForm users={users} group={group} />;
}
