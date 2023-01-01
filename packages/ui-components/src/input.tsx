import { ComponentPropsWithRef, ForwardedRef, forwardRef } from "react";

interface B4hInputProp extends ComponentPropsWithRef<"input"> {
  label?: string;
}

export const B4hInput = forwardRef(
  (props: B4hInputProp, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <>
        {props.label ?? <label>{props.label}</label>}
        <input ref={ref} {...props} />
      </>
    );
  }
);
