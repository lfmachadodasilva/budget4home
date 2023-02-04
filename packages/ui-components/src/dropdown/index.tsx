'use client';

import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react';
import { B4hSelectOptions } from '../select';

import styles from './index.module.scss';

interface B4hDropdownProps extends ComponentPropsWithoutRef<'select'> {
  options: B4hSelectOptions[];
}

export const B4hDropdown = (props: B4hDropdownProps) => {
  const triggerRef = useRef();
  const [size, setSize] = useState<{ height: string; width: string }>({
    height: '8px',
    width: '8px'
  });

  useEffect(() => {
    // @ts-ignore
    setSize({ height: triggerRef?.current?.clientHeight, width: triggerRef?.current?.clientWidth });
  }, [triggerRef.current]);

  return (
    <div>
      <select
        className={styles.select}
        {...props}
        value=""
        style={{
          height: size.height,
          width: size.width,
          zIndex: '2'
        }}
      >
        <option key="" value=""></option>
        {props.options?.map(option => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </select>
      <div ref={triggerRef} style={{ zIndex: '1' }}>
        {props.children}
      </div>
    </div>
  );
};
