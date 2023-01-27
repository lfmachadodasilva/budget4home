import { cookies } from 'next/headers';
import Link from 'next/link';
import { LabelItem } from '../../../../components/labels/item';
import { firebaseAdminAuth } from '../../../../util/firebaseAdmin';
import { labelRepository } from '../../../../util/repositories';
import { B4hRoutes } from '../../../../util/routes';

export default async function ({ params }: any) {
  const groupId = params.groupId as string;

  const nextCookies = cookies();
  const token = nextCookies.get('token').value;
  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  const labels = await labelRepository.getAll(uid, groupId);

  return (
    <>
      <h3>labels</h3>
      <Link href={`${B4hRoutes.groups}/${groupId}${B4hRoutes.labelAdd}`}>add</Link>
      {labels.length <= 0 && <h4>Empty list of label.</h4>}

      {labels.map(label => (
        <LabelItem label={label} groupId={groupId} />
      ))}
    </>
  );
}
