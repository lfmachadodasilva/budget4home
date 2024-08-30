'use client';

import { GroupModel } from '@b4h/models';
import styles from './page.module.scss';

export const metadata = {
  title: 'groups | budget4home'
};

export default function GroupsPageClient({ groups }: { groups: GroupModel[] }) {
  const handleOnClick = (label: GroupModel) => {
    alert(JSON.stringify(label));
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.header}>groups</h1>
      {groups.map(group => (
        <div className={styles.item} key={group.id} onClick={() => handleOnClick(group)}>
          {group.name}
        </div>
      ))}
    </div>
  );
}
