import { B4hPageLayout } from '../layouts/pageBase';

export const LabelsPage = () => {
  return (
    <B4hPageLayout>
      <slot slot="header">labels</slot>
      <slot slot="body">TODO</slot>
    </B4hPageLayout>
  );
};
