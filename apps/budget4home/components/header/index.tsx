import Link from 'next/link';
import { useRouter } from 'next/router';
import { useLocale } from '../../hooks/useLocale';
import { B4hRoutes } from '../../util/routes';

export const B4hHeader = () => {
  const { formatMessage } = useLocale();
  const { query } = useRouter();

  const labelsHref = query.groupId ? `${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labels}` : B4hRoutes.labels;
  const expensesHref = query.groupId ? `${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}` : B4hRoutes.expenses;

  return (
    <>
      <Link href={B4hRoutes.home}>{formatMessage('header_home')}</Link>
      <br></br>
      <Link href={B4hRoutes.groups}>{formatMessage('header_groups')}</Link>
      <br></br>
      <Link href={labelsHref}>{formatMessage('header_labels')}</Link>
      <br></br>
      <Link href={expensesHref}>{formatMessage('header_expenses')}</Link>
      <br></br>
      <Link href={B4hRoutes.reports}>{formatMessage('header_reports')}</Link>
    </>
  );
};
