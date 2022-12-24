import { GetServerSideProps } from "next/types";
import { Expense } from "../../../modals/expense";
import { Label } from "../../../modals/label";
import { FirestoreCollections } from "../../../repositories/collections";
import { firebaseAdminFirestore } from "../../../util/firebaseAdmin";

interface ExpensesProps {
  expenses: Expense[];
}

export const getServerSideProps: GetServerSideProps<ExpensesProps> = async context => {
  const expenses: Expense[] = [];

  try {
    const b4hCollections = await firebaseAdminFirestore
      .collection(FirestoreCollections.expeses(context.query.groupId as string))
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

const getAll = () => {

}