import { ComponentPropsWithoutRef } from 'react';
import { B4hSpinner } from '../spinner';

import styles from './index.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
}

export const B4hButton = (props: B4hButtonProps) => {
  const { loading, ...propsCopy } = props;
  return (
    <button
      className={styles.button}
      {...propsCopy}
      type="button"
      disabled={props.disabled || loading === true}
    >
      {loading === true && <B4hSpinner />}
      {props.children}
    </button>
  );
};
