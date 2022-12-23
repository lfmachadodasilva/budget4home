import Head from 'next/head';
import { useLocale } from '../../hooks/useLocale';

export const B4hHead = () => {
  const { formatMessage } = useLocale();

  return (
    <Head>
      <title>{formatMessage('title', { default: 'title' })}</title>
    </Head>
  );
};
