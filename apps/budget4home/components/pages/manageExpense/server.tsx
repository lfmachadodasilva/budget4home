import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Expense } from '../../../modals/expense';
import { Label } from '../../../modals/label';
import { getExpense } from '../../../repositories/expenses';
import { getAllLabels } from '../../../repositories/label';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';
import { B4hRoutes } from '../../../util/routes';

interface ManageExpenseProps {
  expense: Expense;
  labels: Label[];
}

export const getServerSideProps: GetServerSideProps<ManageExpenseProps> = async context => {
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

  let expense: Expense = null;
  let labels: Label[] = [];

  if (context.query.groupId) {
    try {
      expense = await getExpense(
        firebaseAdminFirestore,
        uid,
        context.query.groupId as string,
        context.query.expenseId as string
      );
    } catch (e: any) {
      console.error('Fail to fetch expenses', e);
    }

    // return 404 if group is null
  }

  try {
    labels = await getAllLabels(firebaseAdminFirestore, uid, context.query.groupId as string);
  } catch (e: any) {
    console.error('Fail to fetch expenses', e);
  }

  return {
    props: {
      expense,
      labels
    }
  };
};
