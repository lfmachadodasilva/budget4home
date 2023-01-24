import { Header } from './header';
import { Providers } from './provider';

import '@budget4home/ui-components/src/styles/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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
