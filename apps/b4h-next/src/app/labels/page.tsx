import { B4hButton } from '@/components/ui/button/button';
import { B4hItem } from '@/components/ui/item/item';
import { B4hPageLayout } from '@/components/ui/layout/layout';
import { useB4hSession } from '@/utils/hooks/useB4hSession';
import { B4hRoutes } from '@/utils/routes';
import { getGroupsFirestore, getLabelsFirestore } from '@b4h/firestore';
import Link from 'next/link';

export const metadata = {
  title: 'labels | budget4home'
};

export default async function Labels() {
  const { userId } = useB4hSession();
  const groups = await getGroupsFirestore(userId);
  const labels = await getLabelsFirestore(userId, groups[0].id);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>labels</h1>
        <Link href={B4hRoutes.labelsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        <B4hItem.Root>
          <B4hItem.Items>
            {labels.map(label => (
              <Link href={`${B4hRoutes.labels}/${label.id}`} key={label.id}>
                <B4hItem.Item>
                  <p>
                    {label.icon} {label.name}
                  </p>
                </B4hItem.Item>
              </Link>
            ))}
          </B4hItem.Items>
        </B4hItem.Root>
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
