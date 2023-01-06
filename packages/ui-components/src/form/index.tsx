import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hFormProp extends ComponentPropsWithRef<'form'> {
  title: string;
  footer?: JSX.Element;
}

export const B4hForm = forwardRef((props: B4hFormProp, ref: ForwardedRef<HTMLFormElement>) => {
  return (
    <>
      <h3>{props.title}</h3>
      <form className={styles.form} ref={ref} {...props} />
      {props.footer}
    </>
  );
});
