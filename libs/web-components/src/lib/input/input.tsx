import { ComponentPropsWithoutRef, ForwardedRef, forwardRef } from 'react';
import styles from './input.module.scss';

export interface B4hInputProps extends ComponentPropsWithoutRef<'input'> {
  widthFit?: boolean;
  hasError?: boolean;
}
export interface B4hInputControlProps extends ComponentPropsWithoutRef<'div'> {}
export interface B4hInputLabelProps extends ComponentPropsWithoutRef<'label'> {}
export interface B4hInputErrorProps extends ComponentPropsWithoutRef<'span'> {}

export const B4hInputControl = forwardRef(
  (props: B4hInputControlProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { className, ...propsCopy } = props;
    const basicStyle = styles.control;
    return <div ref={ref} {...propsCopy} className={basicStyle} />;
  }
);

export const B4hInput = forwardRef((props: B4hInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { widthFit, hasError, className, ...propsCopy } = props;
  const basicStyle = styles.container;
  const errorStyle = hasError ? styles.inputError : '';
  const widthFitStyle = widthFit ? styles.widthFit : '';
  const inputStyles = [basicStyle, widthFitStyle, errorStyle, className].join(' ');

  return <input ref={ref} {...propsCopy} className={inputStyles} />;
});

export const B4hInputLabel = forwardRef(
  (props: B4hInputLabelProps, ref: ForwardedRef<HTMLLabelElement>) => {
    return <label ref={ref} {...props} />;
  }
);

export const B4hInputError = forwardRef(
  (props: B4hInputErrorProps, ref: ForwardedRef<HTMLSpanElement>) => {
    const { className, ...propsCopy } = props;
    const basicStyle = styles.error;
    return <span ref={ref} {...propsCopy} className={basicStyle} aria-live="polite" />;
  }
);
