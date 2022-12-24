import { GetServerSideProps } from 'next/types';
import { Group } from '../../../modals/group';
import { getAllGroups } from '../../../repositories/groups';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface GroupsProps {
  groups: Group[];
}

export const getServerSideProps: GetServerSideProps<GroupsProps> = async context => {
  let groups: Group[] = [];

  try {
    const groupsEntity = await getAllGroups(firebaseAdminFirestore, '');
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
