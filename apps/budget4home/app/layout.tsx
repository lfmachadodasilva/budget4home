import { Header } from './header';
import { Providers } from './provider';

import '@budget4home/ui-components/src/styles/global.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head></head>
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
