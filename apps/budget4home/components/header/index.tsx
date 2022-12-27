import { signOut } from 'firebase/auth';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAuth } from '../../contexts/auth';
import { useLocale } from '../../hooks/useLocale';
import { firebaseAuth } from '../../util/firebase';
import { B4hRoutes } from '../../util/routes';

export const B4hHeader = () => {
  const { formatMessage } = useLocale();
  const { query } = useRouter();
  const { user } = useAuth();

  const labelsHref = query.groupId ? `${B4hRoutes.groups}/${query.groupId}${B4hRoutes.labels}` : B4hRoutes.labels;
  const expensesHref = query.groupId ? `${B4hRoutes.groups}/${query.groupId}${B4hRoutes.expenses}` : B4hRoutes.expenses;

  const handleOnLogout = async () => {
    await signOut(firebaseAuth);
  };

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
      <br></br>
      {user && <button onClick={handleOnLogout}>Logout</button>}
    </>
  );
};
