import { getUserIdSession } from '@/config/session';

export default function GroupsPage() {
  const userId = getUserIdSession();
  return (
    <div>
      Groups
      <div>user id: {userId}</div>
    </div>
  );
}
