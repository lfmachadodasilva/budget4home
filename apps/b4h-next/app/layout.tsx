import { B4hHeader } from '@/components/header/header';
import { B4hAuthProvider } from '@/providers/authProvider';

import B4hHead from './head';

import '@b4h/web-components';

export const metadata = {
  title: 'budget4home',
  description: 'budget4home - Project to control my personal budget'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <B4hHead />
      <body>
        <B4hAuthProvider>
          <B4hHeader />
          <main>{children}</main>
        </B4hAuthProvider>
      </body>
    </html>
  );
}
