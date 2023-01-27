import { Group } from '@budget4home/base';
import { GroupActions } from '../../../app/groups/(components)/actions';

import styles from './index.module.scss';

export interface GroupItemProps {
  group: Group;
}

export const GroupItem = (props: GroupItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <label>{props.group.name}</label>
        <GroupActions groupId={props.group.id} />{' '}
      </div>
    </div>
  );
};
