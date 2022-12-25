import { GetServerSideProps } from 'next/types';
import { Expense } from '../../../modals/expense';
import { Label } from '../../../modals/label';
import { getExpense } from '../../../repositories/expenses';
import { getAllLabels } from '../../../repositories/label';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface ManageExpenseProps {
  expense: Expense;
  labels: Label[];
}

export const getServerSideProps: GetServerSideProps<ManageExpenseProps> = async context => {
  let expense: Expense = null;
  let labels: Label[] = [];

  if (context.query.groupId) {
    try {
      expense = await getExpense(
        firebaseAdminFirestore,
        '',
        context.query.groupId as string,
        context.query.expenseId as string
      );
    } catch (e: any) {
      console.error('Fail to fetch expenses', e);
    }

    // return 404 if group is null
  }

  try {
    labels = await getAllLabels(firebaseAdminFirestore, '', context.query.groupId as string);
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
