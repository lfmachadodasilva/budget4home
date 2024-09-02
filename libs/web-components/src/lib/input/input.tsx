import { ComponentPropsWithoutRef } from 'react';
import styles from './input.module.scss';

export interface B4hInputProps extends ComponentPropsWithoutRef<'input'> {
  widthFit?: boolean;
}

export const B4hInput = (props: B4hInputProps) => {
  const basicStyle = styles.container;
  const widthFitStyle = props.widthFit ? styles.widthFit : '';
  const inputStyles = [basicStyle, widthFitStyle, props.className].join(' ');

  return <input {...props} className={inputStyles} />;
};
