import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import { B4hPageLayout } from '@/components/ui/layout/layout';
import { ANIMATION_DELAY } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import { getGroupsFirestore } from '@b4h/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'groups | budget4home'
};

export default async function Groups() {
  const { getUserUid, getFavoriteGroupId } = b4hSession();

  const userId = getUserUid();
  const fav = await getFavoriteGroupId(false);
  const groups = await getGroupsFirestore(userId);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>groups</h1>
        <Link href={B4hRoutes.groupsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        <B4hItem.Root>
          <B4hItem.Items>
            {groups.map((group, index) => (
              <B4hFade key={group.id} delay={index * ANIMATION_DELAY}>
                <Link href={`${B4hRoutes.groups}/${group.id}`} key={group.id}>
                  <B4hItem.Item>
                    <p>
                      {fav === group.id && '⭐️'} {group.name}
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
