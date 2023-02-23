import { LabelForm } from '../../../../../../components/labels/form';

export default async function ({ params }: any) {
  const groupId = params.groupId as string;

  return (
    <>
      <LabelForm groupId={groupId} />
    </>
  );
}
