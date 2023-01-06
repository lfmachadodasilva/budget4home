import { ComponentPropsWithoutRef } from 'react';

import styles from './button.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {}

export const B4hButton = (props: B4hButtonProps) => {
  return (
    <button className={styles.button} {...props}>
      {props.children}
    </button>
  );
};
