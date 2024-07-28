import { B4hPageLayout } from '../layouts/page';

export const GroupsPage = () => {
  return (
    <B4hPageLayout>
      <slot slot="header">groups</slot>
      <slot slot="body">TODO</slot>
    </B4hPageLayout>
  );
};
