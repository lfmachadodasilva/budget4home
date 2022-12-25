import { GetServerSideProps } from 'next/types';
import { Label } from '../../../modals/label';
import { getLabel } from '../../../repositories/label';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface ManageLabelProps {
  label: Label;
}

export const getServerSideProps: GetServerSideProps<ManageLabelProps> = async context => {
  let label: Label = null;

  if (context.query.groupId) {
    try {
      label = await getLabel(
        firebaseAdminFirestore,
        '',
        context.query.groupId as string,
        context.query.labelId as string
      );
    } catch (e: any) {
      console.error('Fail to fetch groups', e);
    }

    // return 404 if group is null
  }

  return {
    props: {
      label
    }
  };
};
