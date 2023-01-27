import { ComponentPropsWithoutRef } from 'react';

import styles from './index.module.scss';

interface B4hButtonLinkProps extends ComponentPropsWithoutRef<'a'> {}

export const B4hButtonLink = (props: B4hButtonLinkProps) => {
  return (
    <a className={styles.link} {...props}>
      {props.children}
    </a>
  );
};
