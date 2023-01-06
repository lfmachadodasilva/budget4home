'use client';

import { B4hSelectOptions } from '../select';

import styles from './index.module.scss';

interface B4hDropdownProps {
  trigger: JSX.Element;
  options: B4hSelectOptions[];
}

export const B4hDropdown = (props: B4hDropdownProps) => {
  const handleOnChange = (event: any) => {
    console.log(event);
  };

  return (
    <div>
      <select onChange={handleOnChange} className={styles.select}>
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
