import { cookies } from 'next/headers';

export default function ExpensesPage() {
  const userId = cookies().get('session-user-id')?.value;
  console.log('-------------- label page');
  return (
    <div>
      Expenses
      <div>user id: {userId}</div>
    </div>
  );
}
