import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hInputProp extends ComponentPropsWithRef<'input'> {
  label: string;
}

export const B4hInput = forwardRef((props: B4hInputProp, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <div className={styles.container}>
      <label className={styles.label} htmlFor={props.id}>
        {props.label}
      </label>
      <br />
      <input className={styles.input} ref={ref} {...props} />
    </div>
  );
});
