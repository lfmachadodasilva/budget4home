import { B4hPageLayout } from '../layouts/pageBase';

export const HomePage = () => {
  return (
    <B4hPageLayout>
      <slot slot="header">home</slot>
      <slot slot="body">TODO</slot>
    </B4hPageLayout>
  );
};
