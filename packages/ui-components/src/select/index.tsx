import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import formStyles from '../styles/form.module.scss';
import styles from './index.module.scss';

export interface B4hSelectOptions {
  key: string;
  value: string;
}

interface B4hSelectProp extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: B4hSelectOptions[];
}

export const B4hSelect = forwardRef(
  (props: B4hSelectProp, ref: ForwardedRef<HTMLSelectElement>) => {
    Object.keys(props.options);
    return (
      <div className={formStyles.container}>
        <label className={styles.label} htmlFor={props.id}>
          {props.label}
        </label>
        <br />
        <select className={styles.select} ref={ref} {...props}>
          {props.options.map(option => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);
