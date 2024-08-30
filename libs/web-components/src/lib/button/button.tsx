import { ComponentPropsWithoutRef } from 'react';

import { B4hSpinner } from '../spinner/spinner';
import styles from './button.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
  widthFit?: boolean;
  buttonType?: 'primary' | 'secondary';
}

export const B4hButton = (props: B4hButtonProps) => {
  const { loading, widthFit, buttonType, ...propsCopy } = props;

  const basicStyle = styles.button;
  const widthFitStyle = widthFit ? styles.widthFit : '';
  const buttonTypeStyle =
    buttonType === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary;
  const buttonStyles = [basicStyle, widthFitStyle, buttonTypeStyle].join(' ');

  return (
    <button className={buttonStyles} {...propsCopy} disabled={props.disabled || loading === true}>
      {loading === true && <B4hSpinner size={16} />}
      {props.children}
    </button>
  );
};
