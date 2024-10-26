// import theme first
import './theme.scss';
// import global second
import './global.scss';

import { B4hHeader } from '@/components/header/header';
import { Poppins } from 'next/font/google';
import B4hHead from './head';
import { Providers } from './providers';

export const metadata = {
  title: 'budget4home',
  description: 'budget4home - Project to control my personal budget'
};

const poppings = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppings',
  weight: ['300', '400', '500', '600', '700']
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <B4hHead />
      <body className={poppings.className}>
        <Providers>
          <B4hHeader />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
