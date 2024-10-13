import { getGroupsFirestore, getLabelFirestore } from '@b4h/firestore';
import { B4hLabelForm } from '../(components)/form';
import { B4hNotFound } from '../../../components/notFound';
import { useB4hSession } from '../../../utils/hooks/useB4hSession';

export const metadata = {
  title: 'update label | budget4home'
};

export default async function LabelUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const label = await getLabelFirestore(userId, groups[0].id, id);

  if (!label) {
    return <B4hNotFound />;
  }

  return <B4hLabelForm label={label} />;
}
