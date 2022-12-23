import { en } from '@budget4home/locale';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';

export default function App({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale } = useRouter();

  return (
    <IntlProvider locale={locale ?? 'en'} defaultLocale={defaultLocale} messages={en}>
      <Component {...pageProps} />
    </IntlProvider>
  );
}
