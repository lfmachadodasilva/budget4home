import { ComponentPropsWithoutRef, memo } from 'react';
import styles from './select.module.scss';

export interface B4hSelectProps extends ComponentPropsWithoutRef<'select'> {
  widthFit?: boolean;
}

export const B4hSelect = memo((props: B4hSelectProps) => {
  const { widthFit, className, ...propsCopy } = props;

  const basicStyle = styles.container;
  const widthFitStyle = widthFit ? styles.widthFit : '';
  const selectStyles = [basicStyle, widthFitStyle, className].join(' ');

  return (
    <select {...propsCopy} className={selectStyles}>
      {props.children}
    </select>
  );
});
