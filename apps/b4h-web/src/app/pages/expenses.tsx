import { B4hPageLayout } from '../layouts/page';

export const ExpensesPage = () => {
  return (
    <B4hPageLayout>
      <slot slot="header">expenses</slot>
      <slot slot="body">TODO</slot>
    </B4hPageLayout>
  );
};
