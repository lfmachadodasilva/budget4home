'use client';

import { Children, cloneElement, HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown.module.scss';
import { getNodeByName } from '../../utils/reactNode';

export interface B4hDropdownProps extends HTMLProps<HTMLSelectElement> {
  autoReset?: boolean;
  trigger?: ReactNode;
}

const Root = (props: B4hDropdownProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ height: string; width: string }>({
    height: '24px',
    width: '24px'
  });

  useEffect(() => {
    setSize({
      // @ts-ignore
      height: triggerRef?.current?.clientHeight,
      // @ts-ignore
      width: triggerRef?.current?.clientWidth
    });
  }, [triggerRef.current]);

  const { autoReset, trigger, ...propsCopy } = props;

  return (
    <div>
      <select
        className={`${styles.select} ${props.className}`}
        defaultValue={autoReset ? undefined : 'not-selected'}
        value={autoReset ? 'not-selected' : undefined}
        {...propsCopy}
        style={{
          height: size.height,
          width: size.width,
          zIndex: '2'
        }}
      >
        <option disabled value="not-selected" key="not-selected">
          -- select an option --
        </option>
        {props.children}
      </select>
      <div ref={triggerRef} className={styles.tigger}>
        {trigger}
      </div>
    </div>
  );
};

export const Option = (props: HTMLProps<HTMLOptionElement>) => {
  return <option {...props} />;
};

export const B4hDropdown = {
  Root,
  Option
};
