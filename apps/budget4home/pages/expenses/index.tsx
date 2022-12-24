import { GetServerSideProps } from 'next';
import { Group } from '../../modals/group';
import { firebaseAdminFirestore } from '../../util/firebaseAdmin';

export default function Expenses() {
  return <></>;
}

export const getServerSideProps: GetServerSideProps = async context => {
  let group: Group;

  try {
    const b4hCollections = await firebaseAdminFirestore.collection(`budget4home`).limit(1).get();

    b4hCollections.forEach(doc => {
      group = {
        id: doc.id,
        name: doc.data().name
      };
    });
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
