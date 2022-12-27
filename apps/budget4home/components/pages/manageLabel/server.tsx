import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Label } from '../../../models/label';
import { getLabel } from '../../../repositories/label';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';
import { B4hRoutes } from '../../../util/routes';

interface ManageLabelProps {
  label: Label;
}

export const getServerSideProps: GetServerSideProps<ManageLabelProps> = async context => {
  const cookies = nookies.get(context);
  const token = cookies.token;

  if (!token) {
    return {
      redirect: {
        permanent: false,
        destination: B4hRoutes.login
      },
      props: {}
    };
  }

  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let label: Label = null;

  if (context.query.groupId) {
    try {
      label = await getLabel(
        firebaseAdminFirestore,
        uid,
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
