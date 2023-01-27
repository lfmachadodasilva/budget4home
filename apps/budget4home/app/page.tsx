import Link from 'next/link';
import { Suspense } from 'react';
import { Balance } from '../components/expenses/balance';
import { getUserId } from '../util/getUserId';
import { groupRepository } from '../util/repositories';
import { B4hRoutes } from '../util/routes';

export default async function Page() {
  const userId = await getUserId();
  const group = await groupRepository.getFirst(userId);

  if (!group) {
    return (
      <>
        <h3>
          <small>Welcome to</small> budget4home
        </h3>
        <div
          style={{
            marginTop: '50px'
          }}
        >
          <h4>
            You don't have any group yet. Click <a href={`${B4hRoutes.groupAdd}`}>here</a> to create
            one
          </h4>
        </div>
      </>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginTop: '50px',
        gap: '50px'
      }}
    >
      <Link href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenseAdd}`}>add new expense</Link>

      <div>
        <label>You current balance is:</label>

        <Suspense fallback={<>loading balance</>}>
          {/* @ts-ignore */}
          <Balance groupId={group.id} />
        </Suspense>
      </div>
    </div>
  );
}
