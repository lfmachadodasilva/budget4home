import { B4hHeader } from '../components/header';
import { useLocale } from '../hooks/useLocale';

export default function Home() {
  const { formatMessage } = useLocale();

  return (
    <>
      <h5>{formatMessage('title')}</h5>
      <B4hHeader />
      <h5>Home</h5>
    </>
  );
}
