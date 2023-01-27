import { Label } from '@budget4home/base';
import Link from 'next/link';
import { B4hRoutes } from '../../util/routes';

import styles from './index.module.scss';

export interface LabelItemProps {
  groupId: string;
  label: Label;
}

export const LabelItem = (props: LabelItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.label.icon && <label>{props.label.icon}</label>}
        <label>{props.label.name}</label>
        <Link href={`${B4hRoutes.groups}/${props.groupId}${B4hRoutes.labels}/${props.label.id}`}>
          edit
        </Link>
      </div>
    </div>
  );
};
