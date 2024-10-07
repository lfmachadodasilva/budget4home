import Link from 'next/link';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import { B4hRoutes } from '../../utils/routes';
import { B4hButton } from '../../components/ui/button/button';
import { labels } from './mock';
import { B4hItem } from '../../components/ui/item/item';

export const metadata = {
  title: 'labels | budget4home'
};

export default function Labels() {
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
