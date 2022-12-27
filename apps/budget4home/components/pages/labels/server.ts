import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Label } from '../../../models/label';
import { getAllLabels } from '../../../repositories/label';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';
import { B4hRoutes } from '../../../util/routes';

interface LabelsProps {
  labels: Label[];
}

export const getServerSideProps: GetServerSideProps<LabelsProps> = async context => {
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

  const labels: Label[] = [];
  try {
    const labelsEntity = await getAllLabels(
      firebaseAdminFirestore,
      uid,
      context.query.groupId as string
    );

    labelsEntity.forEach(entity => {
      labels.push({
        id: entity.id,
        name: entity.name
      } as Label);
    });
  } catch (e: any) {
    console.error('Fail to fetch labels', e);
  }

  return {
    props: {
      labels
    }
  };
};
