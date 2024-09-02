'use client';

import { B4hRoutes } from '@/shared/routes';
import { B4hInput, B4hInputProps } from '@b4h/web-components';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { ChangeEvent } from 'react';

export interface B4hMonthPickerProps extends B4hInputProps {}

export const B4hMonthPicker = (props: B4hMonthPickerProps) => {
  const { push } = useRouter();

  const handleOnMonthPicker = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const searchParam = new URLSearchParams({
        year: event.target.value.split('-')[0],
        month: event.target.value.split('-')[1]
      });
      push(`${B4hRoutes.expenses}?${searchParam.toString()}`);
    } else {
      push(B4hRoutes.expenses);
    }
  };

  return (
    <B4hInput
      {...props}
      required
      onChange={handleOnMonthPicker}
      type="month"
      defaultValue={format(
        props.defaultValue ? new Date(props.defaultValue as string) : new Date(),
        'yyyy-MM'
      )}
    />
  );
};
