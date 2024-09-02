import { ComponentPropsWithoutRef } from 'react';
import styles from './input.module.scss';

export interface B4hInputProps extends ComponentPropsWithoutRef<'input'> {
  widthFit?: boolean;
}

export const B4hInput = (props: B4hInputProps) => {
  const { widthFit, className, ...propsCopy } = props;
  const basicStyle = styles.container;
  const widthFitStyle = widthFit ? styles.widthFit : '';
  const inputStyles = [basicStyle, widthFitStyle, className].join(' ');

  return <input {...propsCopy} className={inputStyles} />;
};
