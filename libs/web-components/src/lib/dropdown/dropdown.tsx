'use client';

import { Children, ComponentPropsWithoutRef, memo, useEffect, useRef, useState } from 'react';

import styles from './dropdown.module.scss';

export interface B4hDropdownProps extends ComponentPropsWithoutRef<'select'> {
  autoReset?: boolean;
}

export const B4hDropdown = memo((props: B4hDropdownProps) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ height: string; width: string }>({
    height: '8px',
    width: '8px'
  });

  useEffect(() => {
    // @ts-ignore
    setSize({ height: triggerRef?.current?.clientHeight, width: triggerRef?.current?.clientWidth });
  }, [triggerRef.current]);

  const children = Children.toArray(props.children);
  const options = children.filter(child => (child as any).type === 'option');
  const trigger = children.filter(child => (child as any).type !== 'option');
  const { autoReset, ...propsCopy } = props;

  if (trigger.length > 1) {
    console.warn('B4hDropdown can only have one trigger element');
  }

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
        {options}
      </select>
      <div ref={triggerRef} style={{ zIndex: '1' }}>
        {trigger}
      </div>
    </div>
  );
});
