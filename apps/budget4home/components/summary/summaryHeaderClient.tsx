'use client';

import { B4hButton, B4hForm, B4hInput } from '@budget4home/ui-components';
import { addYears, format } from 'date-fns';
import { useRouter } from 'next/navigation';
import queryString from 'query-string';
import { useRef } from 'react';
import { B4hRoutes } from '../../util/routes';

import styles from './index.module.scss';

export interface SummaryHeaderProps {
  groupId: string;
  from?: Date;
  to?: Date;
}

export const SummaryHeaderClient = (props: SummaryHeaderProps) => {
  const defaultTo = props.to ?? new Date();
  defaultTo.setDate(1);
  const defaultFrom = props.from ?? addYears(defaultTo, -1);

  const { push } = useRouter();
  const fromRef = useRef<HTMLInputElement>();
  const toRef = useRef<HTMLInputElement>();

  const handleOnSearch = () => {
    push(
      queryString.stringifyUrl({
        url: `${B4hRoutes.groups}/${props.groupId}${B4hRoutes.summary}`,
        query: {
          from: format(new Date(fromRef.current.value), 'yyyy-MM-dd'),
          to: format(new Date(toRef.current.value), 'yyyy-MM-dd')
        }
      })
    );
  };

  return (
    <B4hForm
      className={styles.container}
      label="Summary"
      footer={<B4hButton onClick={handleOnSearch}>Search</B4hButton>}
    >
      <div>
        <B4hInput
          ref={fromRef}
          type="date"
          label="From"
          defaultValue={format(defaultFrom, 'yyyy-MM-dd')}
        />
      </div>
      <div>
        <B4hInput
          ref={toRef}
          type="date"
          label="To"
          defaultValue={format(defaultTo, 'yyyy-MM-dd')}
        />
      </div>
    </B4hForm>
  );
};
