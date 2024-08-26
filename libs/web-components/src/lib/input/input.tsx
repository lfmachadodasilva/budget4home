import { ComponentPropsWithoutRef } from 'react';
import styles from './input.module.scss';

export interface B4hInputProps extends ComponentPropsWithoutRef<'input'> {}

export const B4hInput = (props: B4hInputProps) => {
  return <input className={styles.container} {...props} />;
};
