import { format } from 'date-fns';
import { sum } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { useRef } from 'react';
import { ExpenseType } from '../../../models/expense';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query, pathname } = useRouter();

  const dateRef = useRef<HTMLInputElement>();

  const handleOnAdd = async () => {
    await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenseAdd}`);
  };

  const handleOnDate = async () => {
    const date = new Date(dateRef.current.value);
    await push({
      pathname,
      query: {
        ...query,
        year: date.getFullYear(),
        month: date.getMonth() + 1
      }
    });
  };

  const totalUsed =
    sum(props.expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)) / 100;
  const totalLeft =
    (sum(props.expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)) -
      totalUsed) /
    100;

  const date = new Date();
  date.setDate(1);
  query.year && date.setFullYear(+query?.year);
  query.month && date.setMonth(+query?.month - 1);

  return (
    <>
      <h5>Expenses</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      <button onClick={handleOnAdd}>Add</button>
      <br></br>
      <br></br>

      <>
        <input
          type={'month'}
          ref={dateRef}
          defaultValue={format(date, 'yyyy-MM')}
          onChange={handleOnDate}
        />
      </>
      <br></br>
      <br></br>
      <>
        <label>
          <strong>Total used:</strong> {totalUsed.toFixed(2)}
        </label>
      </>
      <br></br>
      <>
        <label>
          <strong>Total left:</strong> {totalLeft.toFixed(2)}
        </label>
      </>

      <ul>
        {props.expenses.map(expense => {
          return (
            <li key={expense.id}>
              <label>{expense.type}</label>
              {' - '}
              <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label>
              {' - '}
              <label>{expense.name}</label> - <label>{(expense.value / 100).toFixed(2)}</label>
              {' - '}
              <label>{expense.label?.name}</label>
              {' - '}
              <Link
                href={`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}/${expense.id}`}
              >
                edit
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}
