import { getLocale } from '../locales';

export default function Head() {
  const locale = getLocale();
  return (
    <>
      <title>{locale.title}</title>

      <meta name="name" content="budget4home" />
      <meta name="description" content="budget4home - Project to control my personal budget" />

      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/logo213.png"></link>
      <link rel="manifest" href="/manifest.json" />

      <meta name="theme-color" content="#612F74" />

      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </>
  );
}
