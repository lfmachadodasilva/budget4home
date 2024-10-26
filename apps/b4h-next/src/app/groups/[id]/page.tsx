import { B4hNotFound } from '@/components/notFound';
import { b4hSession } from '@/utils/session';
import { getGroupFirestore, getUsersFirestore } from '@b4h/firestore';
import { B4hGroupForm } from '../(components)/form';

export const metadata = {
  title: 'update group | budget4home'
};

export default async function GroupUpdate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { getUserId } = b4hSession();
  const userId = await getUserId();

  const [group, users] = await Promise.all([getGroupFirestore(userId, id), getUsersFirestore()]);

  if (!group) {
    return <B4hNotFound />;
  }

  return <B4hGroupForm users={users} group={group} userId={userId} />;
}
