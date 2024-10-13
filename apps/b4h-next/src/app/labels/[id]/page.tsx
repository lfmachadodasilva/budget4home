import { B4hNotFound } from '@/components/notFound';
import { b4hSession } from '@/utils/session';
import { getLabelFirestore } from '@b4h/firestore';
import { B4hLabelForm } from '../(components)/form';

export const metadata = {
  title: 'update label | budget4home'
};

export default async function LabelUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  const { userId, getFavoriteGroupId } = b4hSession();
  const groupId = await getFavoriteGroupId(false);
  const label = await getLabelFirestore(userId, groupId, id);

  if (!label) {
    return <B4hNotFound />;
  }

  return <B4hLabelForm label={label} />;
}
