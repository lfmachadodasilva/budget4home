import { useB4hSession } from '@/hooks/useSession';

export default function ExpensesPage() {
  const { userId } = useB4hSession();

  return (
    <div>
      Expenses
      <div>user id: {userId}</div>
    </div>
  );
}
