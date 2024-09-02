import { GroupForm } from '@/components/forms/group/groupForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import styles from './page.module.scss';

export const metadata = {
  title: 'group | budget4home'
};

export default async function UpdateGroupPage({ params }: { params: { groupId: string } }) {
  const { groupId } = params;
  const { userId } = useB4hSession();
  const groupIdFav = await getGroupId(userId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{groupId === groupIdFav ? '⭐️' : ''} group</h1>
      <GroupForm userId={userId} groupId={groupId} />
    </div>
  );
}
