import { ComponentPropsWithoutRef } from 'react';
import styles from './input.module.scss';

export interface B4hInputProps extends ComponentPropsWithoutRef<'input'> {}

export const B4hInput = (props: B4hInputProps) => {
  return <input {...props} className={`${styles.container} ${props.className}`} />;
};
