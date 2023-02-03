import { Label } from '@budget4home/base';
import { formatValue } from '../../util/util';

import styles from './index.module.scss';

export interface SummaryItemProps {
  groupId: string;
  label: Label;
  total: number;
}

export const SummaryItem = (props: SummaryItemProps) => {
  return (
    <div className={styles.content}>
      {props.label.icon && <p>{props.label.icon}</p>}
      <p>{props.label.name}</p>
      <p>
        <strong>{formatValue(props.total)}</strong>
      </p>
    </div>
  );
};
