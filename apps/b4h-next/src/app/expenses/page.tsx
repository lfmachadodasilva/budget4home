import { getUserIdSession } from '@/config/session';

export default function ExpensesPage() {
  const userId = getUserIdSession();
  return (
    <div>
      Expenses
      <div>user id: {userId}</div>
    </div>
  );
}
