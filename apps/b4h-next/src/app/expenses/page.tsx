import { B4hLoading } from '@/components/loading';
import { B4hButton } from '@/components/ui/button/button';
import { B4hItem } from '@/components/ui/item/item';
import { B4hPageLayout } from '@/components/ui/layout/layout';
import { B4hExpenseHeaderType, expenseQueryParams } from '@/utils/expenses';
import { B4hRoutes } from '@/utils/routes';
import Link from 'next/link';
import { Suspense } from 'react';
import { B4hExpensesHeader } from './(components)/header';
import { B4hExpensesItems } from './(components)/items';
import { ExpensesAnalytics } from './analytics';

export const metadata = {
  title: 'expenses | budget4home'
};

export default async function Expeses({
  searchParams
}: {
  searchParams: Promise<B4hExpenseHeaderType>;
}) {
  const params = await searchParams;
  const queryParams = expenseQueryParams(params);

  return (
    <>
      <ExpensesAnalytics />
      <B4hPageLayout.Root>
        <B4hPageLayout.Header>
          <h1>expenses</h1>
          <Link href={B4hRoutes.expensesAdd + queryParams}>
            <B4hButton>add</B4hButton>
          </Link>
        </B4hPageLayout.Header>
        <B4hPageLayout.Content>
          <B4hExpensesHeader />
          <B4hItem.Root>
            <Suspense key={queryParams} fallback={<B4hLoading />}>
              <B4hExpensesItems
                month={params?.month ?? ''}
                year={params?.year ?? ''}
                viewBy={params?.viewBy ?? ''}
              />
            </Suspense>
          </B4hItem.Root>
        </B4hPageLayout.Content>
      </B4hPageLayout.Root>
    </>
  );
}
