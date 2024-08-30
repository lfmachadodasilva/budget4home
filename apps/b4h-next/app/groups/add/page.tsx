import { GroupForm } from '@/components/forms/group/groupForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import styles from './page.module.scss';

export const metadata = {
  title: 'group | budget4home'
};

export default async function AddGroupPage() {
  const { userId } = useB4hSession();

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>add group</h1>
      <GroupForm userId={userId} />
    </div>
  );
}
