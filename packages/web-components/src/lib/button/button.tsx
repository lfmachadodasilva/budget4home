import { ComponentPropsWithoutRef } from 'react';
import { B4hSpinner } from '../spinner/spinner';

import styles from './button.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
  buttonType?: 'primary' | 'secondary';
}

export const B4hButton = (props: B4hButtonProps) => {
  const { loading, buttonType, ...propsCopy } = props;
  return (
    <button
      className={styles.button}
      {...propsCopy}
      type="button"
      disabled={props.disabled || loading === true}
    >
      {loading === true && <B4hSpinner size={16} />}
      {props.children}
    </button>
  );
};
