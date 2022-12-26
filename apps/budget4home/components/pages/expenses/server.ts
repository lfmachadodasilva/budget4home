import { GetServerSideProps } from 'next/types';
import { Expense } from '../../../modals/expense';
import { getAllExpensesThisMonth } from '../../../repositories/expenses';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface ExpensesProps {
  expenses: Expense[];
}

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async context => {
  let expenses: Expense[] = [];

  try {
    expenses = await getAllExpensesThisMonth(firebaseAdminFirestore, '', context.query.groupId as string);
  } catch (e: any) {
    console.error('Fail to fetch expenses', e);
  }

  return {
    props: {
      expenses: expenses
    }
  };
};
