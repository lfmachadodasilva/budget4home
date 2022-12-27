import { GetServerSideProps } from 'next/types';
import nookies from 'nookies';

import { Group } from '../../../models/group';
import { User } from '../../../models/user';
import { getGroup } from '../../../repositories/groups';
import { getAllUsers } from '../../../repositories/users';
import { firebaseAdminAuth, firebaseAdminFirestore } from '../../../util/firebaseAdmin';
import { B4hRoutes } from '../../../util/routes';

interface GroupProps {
  group: Group;
  users: User[];
}

export const getServerSideProps: GetServerSideProps<GroupProps> = async context => {
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

  let group: Group = null;

  if (context.query.groupId) {
    try {
      group = await getGroup(firebaseAdminFirestore, uid, context.query.groupId as string);
    } catch (e: any) {
      console.error('Fail to fetch groups', e);
    }

    // return 404 if group is null
  }

  const users = await getAllUsers();

  return {
    props: {
      group,
      users
    }
  };
};
