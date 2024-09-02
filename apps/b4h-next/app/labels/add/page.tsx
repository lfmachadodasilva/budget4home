import { LabelForm } from '@/components/forms/label/labelForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import styles from './page.module.scss';

export const metadata = {
  title: 'label | budget4home'
};

export default async function AddLabelPage() {
  const { userId } = useB4hSession();
  const groupId = await getGroupId(userId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>add label</h1>
      <LabelForm userId={userId} groupId={groupId} />
    </div>
  );
}
