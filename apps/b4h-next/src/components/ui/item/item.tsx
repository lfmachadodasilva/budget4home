import { forwardRef, HTMLProps } from 'react';

import styles from './item.module.scss';

const Root = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  (props, ref) =>
    // <div {...props} ref={ref} className={styles.root} />
    props.children
);
Root.displayName = 'B4hForm.Root';

const Group = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>(
  (props, ref) =>
    // <div {...props} ref={ref} className={styles.group} />
    props.children
);
Group.displayName = 'B4hForm.Group';

const GroupTitle = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div {...props} ref={ref} className={styles.groupTitle} />
));
GroupTitle.displayName = 'B4hForm.GroupTitle';

const Items = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div {...props} ref={ref} className={styles.items} />
));
Items.displayName = 'B4hForm.Items';

const Item = forwardRef<HTMLDivElement, HTMLProps<HTMLDivElement>>((props, ref) => (
  <div {...props} ref={ref} className={styles.item} />
));
Item.displayName = 'B4hForm.Item';

export const B4hItem = {
  Root,
  Group,
  GroupTitle,
  Items,
  Item
};
