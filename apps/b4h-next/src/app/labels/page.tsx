import { cookies } from 'next/headers';

export default function LabelPage() {
  const userId = cookies().get('session-user-id')?.value;
  console.log('-------------- label page');
  return (
    <div>
      Labels
      <div>user id: {userId}</div>
    </div>
  );
}
