import { getUsersFirestore } from '@b4h/firestore';
import { B4hGroupForm } from '../../../components/forms/groups';

export const metadata = {
  title: 'add group | budget4home'
};

export default async function GroupAdd() {
  const users = await getUsersFirestore();
  return <B4hGroupForm users={users} />;
}
