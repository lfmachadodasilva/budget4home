import { B4hButtonLink } from '@budget4home/ui-components';
import { cookies } from 'next/headers';
import { LabelItem } from '../../../../components/item/label';
import { SubHeader } from '../../../../components/subheader';
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
      <SubHeader
        label="Labels"
        action={
          <B4hButtonLink href={`${B4hRoutes.groups}/${groupId}${B4hRoutes.labelAdd}`}>
            add
          </B4hButtonLink>
        }
      />

      {labels.length <= 0 && <h4>Empty list of label.</h4>}

      {labels.map(label => (
        <LabelItem label={label} groupId={groupId} key={label.id} />
      ))}
    </>
  );
}
