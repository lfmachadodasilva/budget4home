import { getUserIdSession } from '@/config/session';
import { getLabels } from '@b4h/firestore';

export default async function LabelPage() {
  const userId = getUserIdSession();

  const labels = await getLabels('1', userId as string);

  return (
    <div>
      Labels
      <div>user id: {userId}</div>
      <div>
        {labels.length}
        {labels.map(label => (
          <div key={label.id}>{label.name}</div>
        ))}
      </div>
    </div>
  );
}
