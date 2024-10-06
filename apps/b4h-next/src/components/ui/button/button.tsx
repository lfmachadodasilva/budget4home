import { ButtonHTMLAttributes, forwardRef } from 'react';
// import { B4hSpinner } from '../spinner/spinner';
import styles from './button.module.scss';

interface B4hButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  widthFit?: boolean;
  buttonType?: 'primary' | 'secondary' | 'delete';
}

export const B4hButton = forwardRef<HTMLButtonElement, B4hButtonProps>((props, ref) => {
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
    <button
      {...propsCopy}
      disabled={props.disabled || loading === true}
      ref={ref}
      className={buttonStyles}
    >
      {/* {loading === true && <B4hSpinner size={16} />} */}
      {props.children}
    </button>
  );
});
