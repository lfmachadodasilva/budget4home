import { b4hSession } from '@/utils/session';
import { getUsersFirestore } from '@b4h/firestore';
import { B4hGroupForm } from '../(components)/form';

export const metadata = {
  title: 'add group | budget4home'
};

export default async function GroupAdd() {
  const { getUserId } = b4hSession();
  const userId = getUserId();
  const users = await getUsersFirestore();

  return <B4hGroupForm users={users} userId={userId} />;
}
