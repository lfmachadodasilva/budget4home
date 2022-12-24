import { GetServerSideProps } from 'next';
import { Group } from '../../modals/group';
import { getFirstGroup } from '../../repositories/groups';
import { firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default function Expenses() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async context => {
  let group: Group;

  try {
    group = await getFirstGroup(firebaseAdminFirestore, '');
  } catch (e: any) {
    group = null;
    console.error('Fail to fetch labels', e);
  }

  return {
    redirect: {
      permanent: false,
      destination: `/groups/${group.id}/expenses`
    },
    props: {}
  };
};
