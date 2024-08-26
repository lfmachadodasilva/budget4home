import './global.css';
import B4hHead from './head';

export const metadata = {
  title: 'budget4home',
  description: 'budget4home - Project to control my personal budget'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <B4hHead />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
