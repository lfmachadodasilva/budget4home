import { useB4hSession } from 'apps/b4h-next/src/utils/hooks/useB4hSession';
import { B4hLabelForm } from '../../../components/forms/labels';
import { getGroupsFirestore, getLabelFirestore } from '@b4h/firestore';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'update label | budget4home'
};

export default async function LabelUpdate({ params }: { params: { id: string } }) {
  const { id } = params;

  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const label = await getLabelFirestore(userId, groups[0].id, id);

  if (!label) {
    // TODO redirect to 404
    redirect('/labels');
  }

  return <B4hLabelForm label={label} />;
}
