import Link from 'next/link';
import { Suspense } from 'react';
import { B4hLoading } from '../../components/loading';
import { B4hButton } from '../../components/ui/button/button';
import { B4hItem } from '../../components/ui/item/item';
import { B4hPageLayout } from '../../components/ui/layout/layout';
import { B4hExpenseHeaderType } from '../../utils/expenses';
import { B4hRoutes } from '../../utils/routes';
import { B4hExpensesHeader } from './header';
import { B4hExpensesItems } from './items';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function Expeses({ searchParams }: { searchParams: B4hExpenseHeaderType }) {
  const key = JSON.stringify(searchParams);

  return (
    <B4hPageLayout.Root>
      <B4hPageLayout.Header>
        <h1>expenses</h1>
        <Link href={B4hRoutes.expensesAdd}>
          <B4hButton>add</B4hButton>
        </Link>
      </B4hPageLayout.Header>
      <B4hPageLayout.Content>
        <B4hExpensesHeader />
        <B4hItem.Root>
          <Suspense key={key} fallback={<B4hLoading />}>
            <B4hExpensesItems searchParams={searchParams} />
          </Suspense>
        </B4hItem.Root>
      </B4hPageLayout.Content>
    </B4hPageLayout.Root>
  );
}
