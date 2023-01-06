import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './input.module.scss';

interface B4hInputProp extends ComponentPropsWithRef<'input'> {
  label?: string;
}

export const B4hInput = forwardRef((props: B4hInputProp, ref: ForwardedRef<HTMLInputElement>) => {
  return (
    <>
      {props.label ?? <label htmlFor={props.id}>{props.label}</label>}
      <br />
      <input className={styles.input} ref={ref} {...props} />
    </>
  );
});
