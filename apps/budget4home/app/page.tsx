import { B4hButtonLink } from '@budget4home/ui-components';
import { Balance } from '../components/expenses/balance';
import { getDefaultOrFirstGroup } from '../util/defaultOrFirstGroup';
import { getUserId } from '../util/getUserId';
import { B4hRoutes } from '../util/routes';

export default async function Page() {
  const userId = await getUserId();
  const group = await getDefaultOrFirstGroup(userId);

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
    <div>
      <h3>
        <small>Welcome to</small> budget4home
      </h3>
      <div
        style={{
          border: '1px solid var(--secondary-fg-color)',
          borderRadius: 'var(--size-xs)',
          padding: 'var(--size-s)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ padding: 'var(--size-xs)' }}>
            <small>You current balance is:</small>
          </p>
          <p style={{ padding: 'var(--size-xs)' }}>
            {group.name} <br />
          </p>
        </div>

        {/* @ts-ignore */}
        <Balance groupId={group.id} />
      </div>
      <br></br>
      <br></br>
      <B4hButtonLink href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenseAdd}`}>
        add new expense
      </B4hButtonLink>
    </div>
  );
}
