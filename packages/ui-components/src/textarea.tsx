import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

interface B4hTextareaProp extends ComponentPropsWithRef<'textarea'> {
  label?: string;
}

export const B4hTextarea = forwardRef(
  (props: B4hTextareaProp, ref: ForwardedRef<HTMLTextAreaElement>) => {
    return (
      <>
        {props.label ?? <label>{props.label}</label>}
        <textarea ref={ref} {...props} />
      </>
    );
  }
);
