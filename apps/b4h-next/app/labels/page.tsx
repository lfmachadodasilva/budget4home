import { useB4hSession } from '@/hooks/useB4hSession';
import { getGroupId } from '@/shared/groupId';
import { getLabels } from '@b4h/firestore';
import LabelsPageClient from './pageClient';

export const metadata = {
  title: 'labels | budget4home'
};

export default async function LabelsPage() {
  const { userId } = useB4hSession();

  const groupId = await getGroupId(userId);
  const labels = await getLabels(groupId, userId);

  return <LabelsPageClient labels={labels} />;
}
