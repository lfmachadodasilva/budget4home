import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hInputProp extends ComponentPropsWithRef<'input'> {
  label?: string;
  sublabel?: string;
}

export const B4hInput = forwardRef((props: B4hInputProp, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <>
      {props.label && (
        <label className={styles.label} htmlFor={props.id}>
          {props.label} {props.sublabel && <small>{props.sublabel}</small>}
        </label>
      )}
      <input className={styles.input} ref={ref} {...props} />
    </>
  );
});
