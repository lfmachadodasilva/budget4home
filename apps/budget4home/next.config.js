// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
module.exports = {
  reactStrictMode: true,
  experimental: {
    // appDir: true,
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en'
  },
  serverRuntimeConfig: {},
  publicRuntimeConfig: {}
};
