'use client';

import { ComponentPropsWithoutRef } from 'react';
import { B4hSelectOptions } from '../select';

import styles from './index.module.scss';

interface B4hDropdownProps extends ComponentPropsWithoutRef<'select'> {
  trigger: JSX.Element;
  options: B4hSelectOptions[];
}

export const B4hDropdown = (props: B4hDropdownProps) => {
  return (
    <div>
      <select className={styles.select} {...props}>
        {props.options?.map(option => {
          return (
            <option key={option.key} value={option.key}>
              {option.value}
            </option>
          );
        })}
      </select>
      {props.trigger}
    </div>
  );
};
