import { ComponentPropsWithoutRef } from 'react';

import { B4hSpinner } from '../spinner/spinner';
import styles from './button.module.scss';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {
  loading?: boolean;
  widthFit?: boolean;
  buttonType?: 'primary' | 'secondary' | 'delete';
}

export const B4hButton = (props: B4hButtonProps) => {
  const { loading, widthFit, buttonType, className, ...propsCopy } = props;

  const basicStyle = styles.button;
  const widthFitStyle = widthFit ? styles.widthFit : '';
  const buttonTypeStyle =
    buttonType === 'secondary'
      ? styles.buttonSecondary
      : buttonType == 'delete'
      ? styles.buttonDelete
      : styles.buttonPrimary;
  const buttonStyles = [basicStyle, widthFitStyle, buttonTypeStyle, className].join(' ');

  return (
    <button {...propsCopy} disabled={props.disabled || loading === true} className={buttonStyles}>
      {loading === true && <B4hSpinner size={16} />}
      {props.children}
    </button>
  );
};
