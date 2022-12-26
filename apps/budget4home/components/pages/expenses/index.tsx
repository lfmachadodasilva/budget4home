import { format } from 'date-fns';
import { sum } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { ExpenseType } from '../../../modals/expense';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query } = useRouter();

  const handleOnAdd = async () => {
    await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenseAdd}`);
  };

  const totalUsed = sum(props.expenses.filter(x => x.type === ExpenseType.outcoming).map(x => x.value)) / 100;
  const totalLeft =
    (sum(props.expenses.filter(x => x.type === ExpenseType.incoming).map(x => x.value)) - totalUsed) / 100;

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
        <label>
          <strong>{format(new Date(), 'MMMM yyyy')}</strong>
        </label>
      </>
      <br></br>
      <>
        <label>Total used: {totalUsed.toFixed(2)}</label>
      </>
      <br></br>
      <>
        <label>Total left: {totalLeft.toFixed(2)}</label>
      </>
      <br></br>
      <br></br>
      {props.expenses.map(expense => {
        return (
          <div key={expense.id}>
            <label>{expense.type}</label> - <label>{expense.id}</label> -{' '}
            <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label> - <label>{expense.name}</label> -{' '}
            <label>{(expense.value / 100).toFixed(2)}</label> - <label>{expense.label?.name}</label>
            {' - '}
            <Link href={`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}/${expense.id}`}>edit</Link>
          </div>
        );
      })}
    </>
  );
}
