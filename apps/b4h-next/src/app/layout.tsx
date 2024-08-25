import { B4hHeader } from '@/components/header/header';
import '@b4h/web-components';
import { B4hAuthProvider } from '../providers/authProvider';

export const metadata = {
  title: 'budget4home',
  description: 'budget4home - Project to control my personal budget'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <B4hAuthProvider>
          <B4hHeader />
          {children}
        </B4hAuthProvider>
      </body>
    </html>
  );
}
