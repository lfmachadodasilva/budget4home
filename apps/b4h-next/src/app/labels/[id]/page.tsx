import { B4hNotFound } from '@/components/notFound';
import { b4hSession } from '@/utils/session';
import { getLabelFirestore } from '@b4h/firestore';
import { B4hLabelForm } from '../(components)/form';

export const metadata = {
  title: 'update label | budget4home'
};

export default async function LabelUpdate({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { getFavoriteGroupId } = b4hSession();

  const { userId, groupId } = await getFavoriteGroupId();
  const label = await getLabelFirestore(userId, groupId, id);

  if (!label) {
    return <B4hNotFound />;
  }

  return <B4hLabelForm label={label} />;
}
