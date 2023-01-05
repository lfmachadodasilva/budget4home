'use client';

import { B4hInput } from '@budget4home/ui-components';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useRef } from 'react';

export const ExpensesDate = () => {
  const query = useSearchParams();
  const { push } = useRouter();
  const pathname = usePathname();
  const dateRef = useRef<HTMLInputElement>();

  const handleOnDate = async () => {
    const date = new Date(dateRef.current.value);
    push(
      queryString.stringifyUrl({
        url: pathname,
        query: {
          year: date.getFullYear(),
          month: date.getMonth() + 1
        }
      })
    );
  };

  const date = new Date();
  date.setDate(1);
  query.get('year') && date.setFullYear(+query.get('year'));
  query.get('month') && date.setMonth(+query.get('month') - 1);

  return (
    <B4hInput
      id={'month'}
      type={'month'}
      ref={dateRef}
      defaultValue={format(date, 'yyyy-MM')}
      onChange={handleOnDate}
    />
  );
};
