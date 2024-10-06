import { B4hExpensesForm } from '../form';
import { expenses, labels } from '../mock';

export const metadata = {
  title: 'update expense | budget4home'
};

export default function ExpesesUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  return <B4hExpensesForm labels={labels} expense={expenses.find(expense => expense.id === id)} />;
}
