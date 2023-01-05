import { ComponentPropsWithoutRef } from 'react';

interface B4hButtonProps extends ComponentPropsWithoutRef<'button'> {}

export const B4hButton = (props: B4hButtonProps) => {
  return <button {...props}>{props.children}</button>;
};
