import { GetServerSideProps } from 'next';
import nookies from 'nookies';

import { Group } from '../../models/group';
import { getFirstGroup } from '../../repositories/groups';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../util/firebaseAdmin';
import { B4hRoutes } from '../../util/routes';

export default function Expenses() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async context => {
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

  let group: Group;

  try {
    group = await getFirstGroup(firebaseAdminFirestore, uid);
  } catch (e: any) {
    group = null;
    console.error('Fail to fetch labels', e);
  }

  return {
    redirect: {
      permanent: false,
      destination: group ? `/groups/${group.id}/expenses` : B4hRoutes.notFound
    },
    props: {}
  };
};
