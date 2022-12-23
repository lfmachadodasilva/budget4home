import Link from 'next/link';
import { useLocale } from '../../hooks/useLocale';
import { B4hRoutes } from '../../util/routes';

export const B4hHeader = () => {
  const { formatMessage } = useLocale();

  return (
    <>
      <Link href={B4hRoutes.home}>{formatMessage('header_home')}</Link>
      <br></br>
      <Link href={B4hRoutes.groups}>{formatMessage('header_groups')}</Link>
      <br></br>
      <Link href={B4hRoutes.labels}>{formatMessage('header_labels')}</Link>
      <br></br>
      <Link href={B4hRoutes.expenses}>{formatMessage('header_expenses')}</Link>
      <br></br>
      <Link href={B4hRoutes.reports}>{formatMessage('header_reports')}</Link>
    </>
  );
};
