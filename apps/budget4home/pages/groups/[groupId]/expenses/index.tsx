import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { B4hHeader } from '../../../../components/header';
import { Expense } from '../../../../modals/expense';
import { Label } from '../../../../modals/label';
import { firebaseAdminFirestore } from '../../../../util/firebaseAdmin';

interface ExpensesProps {
  expenses: Expense[];
}

export default function Expenses(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async context => {
  const expenses: Expense[] = [];

  try {
    const b4hCollections = await firebaseAdminFirestore
      .collection(`budget4home/${context.query.groupId}/expenses`)
      .get();

    for await (let doc of b4hCollections.docs) {
      const data = doc.data();

      let labelRef: Label = null;
      if (data.labelRef) {
        const labelDoc = await data.labelRef.get();
        labelRef = {
          id: labelDoc.id,
          name: labelDoc.data().name
        };
      }

      expenses.push({
        id: doc.id,
        name: data.name,
        value: data.value,
        date: new Date(data.date.seconds).toISOString(),
        label: labelRef
      });
    }
  } catch (e: any) {
    console.error('Fail to fetch expenses', e);
  }

  return {
    props: {
      expenses: expenses
    }
  };
};
