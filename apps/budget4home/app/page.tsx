import { B4hButton, B4hButtonLink, B4hSpinner } from '@budget4home/ui-components';
import { Suspense } from 'react';
import { Balance } from '../components/expenses/balance';
import { getLocale } from '../locales';
import { getDefaultOrFirstGroup } from '../util/defaultOrFirstGroup';
import { getUserId } from '../util/getUserId';
import { B4hRoutes } from '../util/routes';

export default async function Page() {
  const locale = getLocale();
  const userId = await getUserId();
  const group = await getDefaultOrFirstGroup(userId);

  if (!group) {
    return (
      <>
        <h3>{locale.home.welcome}</h3>
        <div
          style={{
            marginTop: '50px'
          }}
        >
          <h4>{locale.common.missingGroup}</h4>
        </div>
      </>
    );
  }

  return (
    <div>
      <h3>{locale.home.welcome}</h3>
      <div
        style={{
          border: '1px solid var(--secondary-fg-color)',
          borderRadius: 'var(--size-xs)',
          padding: 'var(--size-s)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ padding: 'var(--size-xs)' }}>
            <small>{locale.home.balanace}</small>
          </p>
          <p style={{ padding: 'var(--size-xs)' }}>
            {group.name} <br />
          </p>
        </div>

        <Suspense fallback={<B4hSpinner />}>
          {/* @ts-ignore */}
          <Balance groupId={group.id} />
        </Suspense>
      </div>
      <br></br>
      <br></br>
      <B4hButtonLink href={`${B4hRoutes.groups}/${group.id}${B4hRoutes.expenseAdd}`}>
        {locale.home.add}
      </B4hButtonLink>
      <B4hButton loading={true}>loaidng</B4hButton>
    </div>
  );
}
