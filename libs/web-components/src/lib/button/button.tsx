import { ComponentPropsWithoutRef } from 'react';

import { B4hSpinner } from '../spinner/spinner';
import styles from './button.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
}

export const B4hButton = (props: B4hButtonProps) => {
  const { loading, ...propsCopy } = props;
  return (
    <button className={styles.button} {...propsCopy} disabled={props.disabled || loading === true}>
      {loading === true && <B4hSpinner size={16} />}
      {props.children}
    </button>
  );
};
