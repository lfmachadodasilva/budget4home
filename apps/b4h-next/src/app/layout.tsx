import { B4hHeader } from '@/components/header/header';
import './global.scss';
import B4hHead from './head';
import { Providers } from './providers';

export const metadata = {
  title: 'budget4home'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <B4hHead />
      <body>
        <Providers>
          <B4hHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
