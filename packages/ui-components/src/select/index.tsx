import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

export interface B4hSelectOptions {
  key: string;
  value: string;
}

interface B4hSelectProp extends ComponentPropsWithRef<'select'> {
  label?: string;
  sublabel?: string;
  options: B4hSelectOptions[];
}

export const B4hSelect = forwardRef(
  (props: B4hSelectProp, ref: ForwardedRef<HTMLSelectElement>) => {
    Object.keys(props.options);
    return (
      <>
        <label className={styles.label} htmlFor={props.id}>
          {props.label} {props.sublabel && <small>{props.sublabel}</small>}
        </label>
        <select className={styles.select} ref={ref} {...props}>
          {props.options.map(option => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </select>
      </>
    );
  }
);
