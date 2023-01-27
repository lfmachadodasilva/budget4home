import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

import styles from './index.module.scss';

interface B4hTextareaProp extends ComponentPropsWithRef<'textarea'> {
  label?: string;
  sublabel?: string;
}

export const B4hTextarea = forwardRef(
  (props: B4hTextareaProp, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <>
        {props.label && (
          <>
            <label className={styles.label} htmlFor={props.id}>
              {props.label} {props.sublabel && <small>{props.sublabel}</small>}
            </label>
          </>
        )}
        <textarea className={styles.textarea} ref={ref} {...props} />
      </>
    );
  }
);
