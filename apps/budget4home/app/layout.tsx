import { B4hHeader } from './header';
import { Providers } from './providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body>
        <Providers>
          <B4hHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
