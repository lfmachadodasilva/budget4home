import { ComponentPropsWithRef, ForwardedRef, forwardRef } from 'react';

export interface B4hSelectOptions {
  key: string;
  value: string;
}

interface B4hSelectProp extends ComponentPropsWithRef<'select'> {
  label?: string;
  options: B4hSelectOptions[];
}

export const B4hSelect = forwardRef(
  (props: B4hSelectProp, ref: ForwardedRef<HTMLSelectElement>) => {
    Object.keys(props.options);
    return (
      <>
        {props.label ?? <label htmlFor={props.id}>{props.label}</label>}
        <select ref={ref} {...props}>
          {props.options.map(option => {
            return (
              <option key={option.key} value={option.key}>
                {option.value}
              </option>
            );
          })}
        </select>
      </>
    );
  }
);
