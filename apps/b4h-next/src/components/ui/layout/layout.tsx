import { HTMLProps } from 'react';

import styles from './layout.module.scss';

export const Root = (props: HTMLProps<HTMLDivElement>) => {
  return <>{props.children}</>;
};
Root.displayName = 'B4hPageLayout.Root';

export const Header = (props: HTMLProps<HTMLDivElement>) => {
  return <div className={styles.header}>{props.children}</div>;
};
Header.displayName = 'B4hPageLayout.Header';

export const Actions = (props: HTMLProps<HTMLDivElement>) => {
  return <div className={styles.actions}>{props.children}</div>;
};
Actions.displayName = 'B4hPageLayout.Actions';

export const Content = (props: HTMLProps<HTMLDivElement>) => {
  return <div className={styles.content}>{props.children}</div>;
};
Content.displayName = 'B4hPageLayout.Content';

export const B4hPageLayout = {
  Root,
  Header,
  Content,
  Actions
};
