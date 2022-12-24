import { InferGetServerSidePropsType } from 'next/types';
import { B4hHeader } from '../../header';
import { getServerSideProps } from './server';

export function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Expenses</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      {props.expenses.map(expense => {
        return (
          <div key={expense.id}>
            <label>{expense.id}</label> - <label>{expense.date}</label> - <label>{expense.name}</label> -{' '}
            <label>{expense.value}</label> - <label>{expense.label?.name}</label>
          </div>
        );
      })}
    </>
  );
}
