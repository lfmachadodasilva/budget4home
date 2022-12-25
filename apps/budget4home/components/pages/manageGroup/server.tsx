import { GetServerSideProps } from 'next/types';
import { Group } from '../../../modals/group';
import { getGroup } from '../../../repositories/groups';
import { firebaseAdminFirestore } from '../../../util/firebaseAdmin';

interface GroupProps {
  group: Group;
}

export const getServerSideProps: GetServerSideProps<GroupProps> = async context => {
  let group: Group = null;

  if (context.query.groupId) {
    try {
      group = await getGroup(firebaseAdminFirestore, '', context.query.groupId as string);
    } catch (e: any) {
      console.error('Fail to fetch groups', e);
    }

    // return 404 if group is null
  }

  return {
    props: {
      group
    }
  };
};
