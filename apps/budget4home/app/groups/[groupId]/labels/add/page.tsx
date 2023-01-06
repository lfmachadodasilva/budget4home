import { cookies } from 'next/headers';
import { LabelForm } from '../(components)/form';
import { firebaseAdminAuth } from '../../../../../util/firebaseAdmin';
import { groupRepository } from '../../../../../util/repositories';

export default async function ({ params }: any) {
  let groupId = params.groupId;

  if (!groupId) {
    const nextCookies = cookies();
    const token = nextCookies.get('token').value;
    const { uid } = await firebaseAdminAuth.verifyIdToken(token);

    groupId = await groupRepository.getFirst(uid);
  }

  return (
    <>
      <LabelForm groupId={groupId} />
    </>
  );
}
