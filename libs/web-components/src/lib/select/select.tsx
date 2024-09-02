import { ComponentPropsWithoutRef, memo } from 'react';
import styles from './select.module.scss';

export interface B4hSelectProps extends ComponentPropsWithoutRef<'select'> {}

export const B4hSelect = memo((props: B4hSelectProps) => {
  return (
    <select {...props} className={`${styles.container} ${props.className}`}>
      {props.children}
    </select>
  );
});
