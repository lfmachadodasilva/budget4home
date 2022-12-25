import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { InferGetServerSidePropsType } from 'next/types';
import { B4hRoutes } from '../../../util/routes';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { push, query } = useRouter();

  const handleOnAdd = async () => {
    await push(`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenseAdd}`);
  };

  return (
    <>
      <h5>Expenses</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      <button onClick={handleOnAdd}>Add</button>
      <br></br>
      <br></br>
      {props.expenses.map(expense => {
        return (
          <div key={expense.id}>
            <label>{expense.type}</label> - <label>{expense.id}</label> -{' '}
            <label>{format(new Date(expense.date), 'yyyy-MM-dd')}</label> - <label>{expense.name}</label> -{' '}
            <label>{expense.value}</label> - <label>{expense.label?.name}</label>
            {' - '}
            <Link href={`${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}/${expense.id}`}>edit</Link>
          </div>
        );
      })}
    </>
  );
}
