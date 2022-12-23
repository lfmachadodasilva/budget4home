import { AppProps, NextWebVitalsMetric } from 'next/app';
import { useRouter } from 'next/router';
import { IntlProvider } from 'react-intl';
import { B4hBasicLayout } from '../components/layouts/basic';
import * as locales from '../locale';
import { B4hRoutes } from '../util/routes';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric);
}

export default function App({ Component, pageProps }: AppProps) {
  const { locale, defaultLocale, pathname } = useRouter();

  // @ts-ignore
  const localeCopy = locales[locale ?? 'en'];

  const messages = localeCopy[pathname] ?? localeCopy[B4hRoutes.home];

  return (
    <IntlProvider locale={locale ?? 'en'} defaultLocale={defaultLocale} messages={messages}>
      <B4hBasicLayout>
        <Component {...pageProps} />
      </B4hBasicLayout>
    </IntlProvider>
  );
}
