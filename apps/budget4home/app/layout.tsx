import { Providers } from './provider';

import '@budget4home/ui-components/src/styles/global.scss';
import { HeaderClient } from '../components/headerClient';
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
            <HeaderClient />
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
