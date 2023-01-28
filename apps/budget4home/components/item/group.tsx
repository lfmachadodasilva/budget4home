import { Group } from '@budget4home/base';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GroupActions } from '../group/actions';

import styles from './index.module.scss';

export interface GroupItemProps {
  group: Group;
}

export const GroupItem = (props: GroupItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <label>{props.group.name}</label>
        <GroupActions groupId={props.group.id}>
          <BsThreeDotsVertical />
        </GroupActions>
      </div>
    </div>
  );
};
