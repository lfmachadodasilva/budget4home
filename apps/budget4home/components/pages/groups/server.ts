import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Group } from '../../../modals/group';
import { getAllGroups } from '../../../repositories/groups';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface GroupsProps {
  groups: Group[];
}

export const getServerSideProps: GetServerSideProps<GroupsProps> = async context => {
  const cookies = nookies.get(context);
  const token = cookies.token;

  const { uid } = await firebaseAdminAuth.verifyIdToken(token);

  let groups: Group[] = [];

  try {
    const groupsEntity = await getAllGroups(firebaseAdminFirestore, uid);
    groups = groupsEntity.map(x => {
      return {
        id: x.id,
        name: x.name
      } as Group;
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
