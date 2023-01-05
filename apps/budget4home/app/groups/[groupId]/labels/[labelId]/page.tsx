import { LabelForm } from '../(components)/form';
import { getUserId } from '../../../../../util/getUserId';
import { labelRepository } from '../../../../../util/repositories';

export default async function ({ params }: any) {
  const userId = await getUserId();

  const label = await labelRepository.get(userId, params.groupId, params.labelId);

  return (
    <>
      <h3>label</h3>
      <LabelForm label={label} groupId={params.groupId} />
    </>
  );
}
