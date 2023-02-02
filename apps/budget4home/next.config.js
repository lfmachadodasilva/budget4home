module.exports = {
  reactStrictMode: process.env.NODE_ENV === 'development',
  experimental: {
    appDir: true
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  swcMinify: true,
  transpilePackages: ['ui-components']
};
