'use client';

import { Children, ComponentProps, memo, ReactNode } from 'react';
import { RiCloseFill } from 'react-icons/ri';

import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

import styles from './drawer.module.scss';

export interface B4hDrawerProps extends ComponentProps<typeof Drawer> {}

export const B4hDrawer = memo((props: B4hDrawerProps) => {
  const header = Children.toArray(props.children).find(
    (child: any) => child?.type.name === B4hDrawerHeader.name
  );
  const body = Children.toArray(props.children).find(
    (child: any) => child?.type.name === B4hDrawerBody.name
  );

  return (
    <Drawer {...props} size={250}>
      <div className={styles.container}>
        <RiCloseFill className={styles.close} onClick={props.onClose} />
        {header}
        {body}
      </div>
    </Drawer>
  );
});

export const B4hDrawerHeader = ({ children }: { children: string }) => {
  return <h2 className={styles.header}>{children}</h2>;
};
export const B4hDrawerBody = ({ children }: { children: ReactNode }) => {
  return <div className={styles.body}>{children}</div>;
};
