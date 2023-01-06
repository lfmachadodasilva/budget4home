import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hInputProp extends ComponentPropsWithRef<'input'> {
  label?: string;
}

export const B4hInput = forwardRef((props: B4hInputProp, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={styles.container}>
      {props.label && (
        <label className={styles.label} htmlFor={props.id}>
          {props.label}
        </label>
      )}
      {props.type !== 'checkbox' && <br />}
      <input className={styles.input} ref={ref} {...props} />
    </div>
  );
});
