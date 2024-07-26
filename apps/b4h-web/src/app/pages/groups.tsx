import { B4hPageTemplate } from '../layouts/pageBase';

export const GroupsPage = () => {
  return (
    <B4hPageTemplate>
      <slot slot="header">groups</slot>
      <slot slot="body">TODO</slot>
    </B4hPageTemplate>
  );
};
