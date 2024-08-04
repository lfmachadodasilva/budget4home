import { cookies } from 'next/headers';

export default function GroupsPage() {
  const userId = cookies().get('session-user-id')?.value;
  console.log('-------------- label page');
  return (
    <div>
      Groups
      <div>user id: {userId}</div>
    </div>
  );
}
