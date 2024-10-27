import { fetchLabels } from '@/clients/labels';
import { B4hButton } from '@/components/ui/button/button';
import { B4hFade } from '@/components/ui/fade';
import { B4hItem } from '@/components/ui/item/item';
import { B4hPageLayout } from '@/components/ui/layout/layout';
import { ANIMATION_DELAY } from '@/utils/constants';
import { B4hRoutes } from '@/utils/routes';
import { b4hSession } from '@/utils/session';
import Link from 'next/link';

export const metadata = {
  title: 'labels | budget4home'
};

export default async function Labels() {
  const { getFavoriteGroupId } = b4hSession();

  const { groupId } = await getFavoriteGroupId();
  const labels = await fetchLabels(groupId);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>labels</h1>
        <Link href={B4hRoutes.labelsAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>

      <B4hPageLayout.Content>
        {!labels ||
          (labels?.length === 0 && (
            <p>
              empty list of labels. create one by clicking the <strong>add</strong> button
            </p>
          ))}
        <B4hItem.Root>
          <B4hItem.Items>
            {labels?.map((label, index) => (
              <B4hFade key={label.id} delay={index * ANIMATION_DELAY}>
                <Link href={`${B4hRoutes.labels}/${label.id}`} key={label.id}>
                  <B4hItem.Item>
                    <p>
                      {label.icon} {label.name}
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
