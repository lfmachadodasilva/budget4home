'use client';

import { HTMLProps, ReactNode, useEffect, useRef, useState } from 'react';

import styles from './dropdown.module.scss';

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
      height: `${triggerRef?.current?.clientHeight ?? '24'}px`,
      width: `${triggerRef?.current?.clientWidth ?? '24'}px`
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
