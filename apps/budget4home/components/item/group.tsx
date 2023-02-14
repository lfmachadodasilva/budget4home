import { Group } from '@budget4home/base';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GroupActionsClient } from '../groups/actions';

import styles from './index.module.scss';

export interface GroupItemProps {
  group: Group;
  default?: boolean;
}

export const GroupItem = (props: GroupItemProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {props.default === true && <label>⭐</label>}
        <label>{props.group.name}</label>
        <GroupActionsClient groupId={props.group.id}>
          <BsThreeDotsVertical />
        </GroupActionsClient>
      </div>
    </div>
  );
};
