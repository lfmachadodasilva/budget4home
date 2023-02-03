'use client';

import { B4hSelect } from '@budget4home/ui-components';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { ChangeEvent } from 'react';

export interface ExpenseViewByProps {
  groupId: string;
}

export const ExpenseViewBy = (props: ExpenseViewByProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const query = useSearchParams();

  let baseQuery: any = {};
  if (query.get('year')) {
    baseQuery = { ...baseQuery, year: query.get('year') };
  }
  if (query.get('month')) {
    baseQuery = { ...baseQuery, month: query.get('month') };
  }

  const handleOnChange = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === 'label') {
      baseQuery = { ...baseQuery, viewBy: 'label' };
    }

    push(
      queryString.stringifyUrl({
        url: pathname,
        query: baseQuery
      })
    );
  };
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <div>
        <B4hSelect
          style={{ width: '100px' }}
          label="View by: "
          options={[
            { key: 'date', value: 'date' },
            { key: 'label', value: 'label' }
          ]}
          value={query.get('viewBy') === 'label' ? 'label' : 'date'}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
