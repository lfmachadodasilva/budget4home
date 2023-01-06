import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hFormProp extends ComponentPropsWithRef<'form'> {
  label: string | JSX.Element;
  footer?: JSX.Element | JSX.Element[];
}

export const B4hForm = forwardRef((props: B4hFormProp, ref: ForwardedRef<HTMLFormElement>) => {
  return (
    <>
      {typeof props.label === 'string' || props.label instanceof String ? (
        <h3>{props.label}</h3>
      ) : (
        props.label
      )}
      <form className={styles.form} ref={ref} {...props} />
      <div className={styles.footer}>{props.footer}</div>
    </>
  );
});
