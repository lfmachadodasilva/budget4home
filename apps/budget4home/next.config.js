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
  publicRuntimeConfig: {
    firebase: {
      key: process.env.FIREBASE_KEY,
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKeyId: process.env.FIREBASE_PRIVATE_KEY_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY
    }
  }
};
