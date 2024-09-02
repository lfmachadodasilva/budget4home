import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { B4hRoutes } from '@/shared/routes';
import { getLabels } from '@b4h/firestore';
import { B4hButton } from '@b4h/web-components';
import Link from 'next/link';
import styles from './page.module.scss';

export const metadata = {
  title: 'labels | budget4home'
};

export default async function LabelsPage() {
  const { userId } = useB4hSession();

  const groupId = await getGroupId(userId);
  const labels = await getLabels(groupId, userId);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>labels</h1>
        <Link href={B4hRoutes.labelsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </div>
      {labels.map(label => (
        <Link href={`${B4hRoutes.labels}/${label.id}`} key={label.id}>
          <div className={styles.item}>
            <label className={styles.itemLabel}>{label.icon}</label>
            <p className={styles.itemTxt}>{label.name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
