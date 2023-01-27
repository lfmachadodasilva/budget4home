import { Header } from './header';
import { Providers } from './provider';

import '@budget4home/ui-components/src/styles/global.scss';
import Head from './head';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Head />
      </head>
      <body>
        <Providers>
          <main>
            <Header />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
