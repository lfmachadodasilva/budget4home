'use client';

import { LabelModel } from '@b4h/models';
import styles from './page.module.scss';

export default function LabelsPageClient({ labels }: { labels: LabelModel[] }) {
  const handleOnClick = (label: LabelModel) => {
    alert(JSON.stringify(label));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>labels</h1>
      {labels.map(label => (
        <div className={styles.item} key={label.id} onClick={() => handleOnClick(label)}>
          <label className={styles.itemLabel}>{label.icon}</label>
          <p className={styles.itemTxt}>{label.name}</p>
        </div>
      ))}
    </div>
  );
}
