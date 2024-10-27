import { fetchGroups } from '@/clients/groups';
import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import { B4hPageLayout } from '@/components/ui/layout/layout';
import { ANIMATION_DELAY } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import Link from 'next/link';

export const metadata = {
  title: 'groups | budget4home'
};

export default async function Groups() {
  const { getFavoriteGroupId } = b4hSession();
  const [{ groupId }, groups] = await Promise.all([getFavoriteGroupId(), fetchGroups()]);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>groups</h1>
        <Link href={B4hRoutes.groupsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        {!groups ||
          (groups?.length === 0 && (
            <p>
              empty list of group. create one by clicking the <strong>add</strong> button
            </p>
          ))}
        <B4hItem.Root>
          <B4hItem.Items>
            {groups?.map((group, index) => (
              <B4hFade key={group.id} delay={index * ANIMATION_DELAY}>
                <Link href={`${B4hRoutes.groups}/${group.id}`} key={group.id}>
                  <B4hItem.Item>
                    <p>
                      {groupId === group.id && '⭐️'} {group.name}
                    </p>
                  </B4hItem.Item>
                </Link>
              </B4hFade>
            ))}
          </B4hItem.Items>
        </B4hItem.Root>
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
