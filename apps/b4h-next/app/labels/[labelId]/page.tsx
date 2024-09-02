import { LabelForm } from '@/components/forms/label/labelForm';
import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { getLabel } from '@b4h/firestore';
import styles from './page.module.scss';

export const metadata = {
  title: 'label | budget4home'
};

export default async function LabelPage({ params }: { params: { labelId: string } }) {
  const { labelId } = params;
  const { userId } = useB4hSession();
  const groupId = await getGroupId(userId);
  const label = await getLabel(groupId, userId, labelId);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>label</h1>
      <LabelForm userId={userId} groupId={groupId} label={label} />
    </div>
  );
}
