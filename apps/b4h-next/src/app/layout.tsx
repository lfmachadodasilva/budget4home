// import theme first
import './theme.scss';
// import global second
import './global.scss';

import { B4hHeader } from '@/components/header/header';
import { BASE_URL } from '@/utils/config';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
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
  const baseUrl = BASE_URL;
  return (
    <html lang="en">
      <B4hHead />

      <body className={poppings.className}>
        <Providers baseUrl={baseUrl}>
          <B4hHeader />
          <main>
            {children}
            <Analytics />
            <SpeedInsights />
          </main>
        </Providers>
      </body>
    </html>
  );
}
