import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Expense } from '../../../models/expense';
import { getAllExpensesThisMonth } from '../../../repositories/expenses';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';
import { B4hRoutes } from '../../../util/routes';

interface ExpensesProps {
  expenses: Expense[];
}

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async context => {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: B4hRoutes.login
      },
      props: {}
    };
  }

  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let expenses: Expense[] = [];

  try {
    const date = new Date();
    date.setDate(1);
    context.query.year && date.setFullYear(+context.query?.year);
    context.query.month && date.setMonth(+context.query?.month - 1);

    expenses = await getAllExpensesThisMonth(
      firebaseAdminFirestore,
      uid,
      context.query.groupId as string,
      date
    );
  } catch (e: any) {
    console.error('Fail to fetch expenses', e);
  }

  return {
    props: {
      expenses: expenses
    }
  };
};
