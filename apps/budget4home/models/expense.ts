import { Label } from "./label";

export const ExpenseType = {
  incoming: "incoming",
  outcoming: "outcoming",
};

export interface Expense {
  id: string;
  type: string;
  name: string;
  value: number;
  date: string;
  label?: Label;
  groupId: string;
}

export const expenseToModel = async (
  doc: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>
): Promise<Expense> => {
  const data = doc.data();

  let labelRef: Label = null;
  if (data.labelRef) {
    const labelDoc = await data.labelRef.get();
    labelRef = {
      id: labelDoc.id,
      name: labelDoc.data().name,
    } as Label;
  }

  return {
    id: doc.id,
    name: data.name,
    type: data.type,
    date: new Date(data.date.toDate()).toISOString(),
    value: data.value,
    label: labelRef,
  } as Expense;
};
