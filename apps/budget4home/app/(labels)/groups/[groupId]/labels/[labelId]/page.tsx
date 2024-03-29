import { LabelForm } from '../../../../../../components/labels/form';

import { getUserId } from '../../../../../../util/getUserId';
import { labelRepository } from '../../../../../../util/repositories';

export default async function LabelsPage({ params }: any) {
  const userId = await getUserId();
  const groupId = params.groupId as string;

  const label = await labelRepository.get(userId, groupId, params.labelId);

  return (
    <>
      <LabelForm label={label} groupId={params.groupId} />
    </>
  );
}
