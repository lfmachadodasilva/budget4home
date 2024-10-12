'use client';

import { format } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent } from 'react';
import { B4hForm } from '../../components/ui/form/form';
import { MONTH_FORMAT } from '../../utils/constants';
import { getDateFromQuery } from '../../utils/expenses';
import { B4hRoutes } from '../../utils/routes';

export const B4hExpensesHeader = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();

  const handleMonth = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      const searchParam = new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        year: event.target.value.split('-')[0] ?? searchParams.get('year'),
        month: event.target.value.split('-')[1] ?? searchParams.get('month')
      });
      push(`${B4hRoutes.expenses}?${searchParam.toString()}`);
    } else {
      push(B4hRoutes.expenses);
    }
  };
  const handleViewBy = (event: ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value) {
      const searchParam = new URLSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        viewBy: event.target.value
      });
      push(`${B4hRoutes.expenses}?${searchParam.toString()}`);
    } else {
      push(B4hRoutes.expenses);
    }
  };

  const date = getDateFromQuery(searchParams.get('year'), searchParams.get('month'));

  return (
    <>
      <B4hForm.Field>
        <B4hForm.Label>month</B4hForm.Label>
        <B4hForm.Input type="month" value={format(date, MONTH_FORMAT)} onChange={handleMonth} />
      </B4hForm.Field>

      <B4hForm.Field>
        <B4hForm.Label>view by</B4hForm.Label>
        <B4hForm.Select onChange={handleViewBy} value={searchParams.get('viewBy') ?? 'byDate'}>
          <B4hForm.Option value="byDate">date</B4hForm.Option>
          <B4hForm.Option value="byLabel">label</B4hForm.Option>
        </B4hForm.Select>
      </B4hForm.Field>
    </>
  );
};
