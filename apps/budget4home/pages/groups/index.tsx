import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { B4hHeader } from '../../components/header';
import { Group } from '../../modals/group';
import { firebaseAdminFirestore } from '../../util/firebaseAdmin';

interface GroupsProps {
  groups: Group[];
}

export default function Groups(props: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <h5>Groups</h5>
      <B4hHeader />
      <br></br>
      <br></br>
      {props.groups.map(group => {
        return (
          <div key={group.id}>
            <label>{group.id}</label> - <label>{group.name}</label>
          </div>
        );
      })}
    </>
  );
}

export const getServerSideProps: GetServerSideProps<GroupsProps> = async context => {
  const groups: Group[] = [];
  try {
    const b4hCollections = await firebaseAdminFirestore.collection('budget4home').get();

    b4hCollections.forEach(doc => {
      groups.push({
        id: doc.id,
        name: doc.data().name
      });
    });
  } catch (e: any) {
    console.error('Fail to fetch groups', e);
  }

  return {
    props: {
      groups
    }
  };
};
