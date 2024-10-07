import Link from 'next/link';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import { B4hRoutes } from '../../utils/routes';
import { B4hButton } from '../../components/ui/button/button';
import { groups } from './mock';
import { B4hItem } from '../../components/ui/item/item';

export const metadata = {
  title: 'groups | budget4home'
};

export default function Groups() {
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
            {groups.map(group => (
              <Link href={`${B4hRoutes.groups}/${group.id}`} key={group.id}>
                <B4hItem.Item>
                  <p>{group.name}</p>
                </B4hItem.Item>
              </Link>
            ))}
          </B4hItem.Items>
        </B4hItem.Root>
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
