import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hTextareaProp extends ComponentPropsWithRef<'textarea'> {
  label?: string;
}

export const B4hTextarea = forwardRef(
  (props: B4hTextareaProp, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <>
        {props.label && (
          <>
            <label>{props.label}</label>
            <br />
          </>
        )}
        <textarea className={styles.textarea} ref={ref} {...props} />
      </>
    );
  }
);
