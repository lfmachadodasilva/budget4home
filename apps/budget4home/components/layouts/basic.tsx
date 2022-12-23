import { PropsWithChildren } from 'react';
import { B4hHead } from '../head';

export const B4hBasicLayout = (props: PropsWithChildren) => {
  return (
    <>
      <B4hHead />
      {props.children}
    </>
  );
};
