import { useB4hSession } from '@/hooks/useSession';
import { getLabels } from '@b4h/firestore';
import { LabelModel } from '@b4h/models';

export const metadata = {
  title: 'labels | budget4home'
};

export default async function LabelPage() {
  const { userId } = useB4hSession();

  let labels: LabelModel[] | null = null;
  try {
    labels = await getLabels('1', userId);
  } catch (err) {
    console.error(err);
  }

  return (
    <div>
      Labels
      {labels && (
        <div>
          {labels.length}
          {labels.map(label => (
            <div key={label.id}>{label.name}</div>
          ))}
        </div>
      )}
    </div>
  );
}
