import { B4hPageTemplate } from '../layouts/pageBase';

export const HomePage = () => {
  return (
    <B4hPageTemplate>
      <slot slot="header">home</slot>
      <slot slot="body">TODO</slot>
    </B4hPageTemplate>
  );
};
