import { B4hExpensesForm } from '../form';
import { labels } from '../mock';

export const metadata = {
  title: 'add expense | budget4home'
};

export default function ExpesesAdd() {
  return <B4hExpensesForm labels={labels} />;
}
